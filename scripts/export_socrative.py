"""Capture questions from a Socrative student quiz during manual navigation.

Install: pip install playwright (and install Brave separately)
Run: python scripts/export_socrative.py
"""

import asyncio
import csv
import json
import re
import shlex
import shutil
import subprocess
import tempfile
from pathlib import Path
from urllib.parse import urljoin

from playwright.async_api import async_playwright

URL = "https://b.socrative.com/student-v2/join"
OUTPUT = Path.cwd()


def find_brave(wrapper_dir):
    """Prefer native Brave; create a temporary launcher for Flatpak if needed."""
    for name in ("brave-browser", "brave"):
        executable = shutil.which(name)
        if executable:
            return executable

    flatpak = shutil.which("flatpak")
    if flatpak:
        result = subprocess.run(
            [flatpak, "list", "--app", "--columns=application"],
            capture_output=True, text=True, check=False,
        )
        app_id = next((line.strip() for line in result.stdout.splitlines()
                       if line.strip().lower() == "com.brave.browser"), None)
        if app_id:
            wrapper = Path(wrapper_dir) / "brave-flatpak"
            wrapper.write_text(
                f"#!/bin/sh\nexec {shlex.quote(flatpak)} run {shlex.quote(app_id)} \"$@\"\n",
                encoding="utf-8",
            )
            wrapper.chmod(0o700)
            return str(wrapper)
    raise FileNotFoundError("Brave not found. Install Brave native or its Flatpak package.")


def clean(value):
    if isinstance(value, str):
        return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", value)).strip()
    return ""


def text_value(value):
    if isinstance(value, str):
        return clean(value)
    if isinstance(value, dict):
        for key in ("text", "value", "content", "label", "title"):
            if value.get(key):
                return text_value(value[key])
    return ""


def parse_question(item):
    """Recognize common question-shaped JSON objects, ignoring other records."""
    if not isinstance(item, dict):
        return None
    question = next((text_value(item[k]) for k in
                     ("question_text", "questionText", "question", "prompt", "stem")
                     if k in item and text_value(item[k])), "")
    if not question:
        return None
    raw_choices = next((item[k] for k in
                        ("choices", "answers", "options", "answerOptions")
                        if isinstance(item.get(k), list)), [])
    choices = [text_value(choice) for choice in raw_choices]
    choices = [choice for choice in choices if choice]
    raw_type = str(item.get("question_type") or item.get("questionType") or item.get("type") or "")
    kind = normalize_type(raw_type, choices)
    image = item.get("image_url") or item.get("imageUrl") or item.get("image")
    if isinstance(image, dict):
        image = image.get("url") or image.get("src")
    if not isinstance(image, str):
        image = None
    number = item.get("question_number") or item.get("questionNumber") or item.get("number")
    return {"number": number, "type": kind, "question": question,
            "choices": choices, "image": image, "_id": item.get("id") or item.get("questionId")}


def normalize_type(value, choices):
    value = re.sub(r"[^a-z0-9]+", "_", value.lower()).strip("_")
    if "true" in value and "false" in value:
        return "true_false"
    if "multiple" in value or value in ("mc", "choice", "multiplechoice"):
        return "multiple_choice"
    if "short" in value or "text" in value:
        return "short_answer"
    return value or ("multiple_choice" if choices else "unknown")


def walk_json(value):
    if isinstance(value, dict):
        question = parse_question(value)
        if question:
            yield question
        for child in value.values():
            yield from walk_json(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk_json(child)


class Capture:
    def __init__(self):
        self.questions = []
        self.ids = set()
        self.texts = set()
        self.started = False
        self.tasks = set()

    def add(self, question):
        text = clean(question.get("question", ""))
        identifier = str(question.get("_id") or "")
        key = text.casefold()
        if not text or key in self.texts or (identifier and identifier in self.ids):
            return
        self.texts.add(key)
        if identifier:
            self.ids.add(identifier)
        number = question.get("number")
        if not isinstance(number, (int, str)) or not str(number).strip():
            number = len(self.questions) + 1
        self.questions.append({"number": number, "type": question.get("type") or "unknown",
                               "question": text, "choices": question.get("choices") or [],
                               "image": question.get("image") or None})
        print(f"question captured: {number} - {text[:100]}", flush=True)

    def response(self, response):
        if self.started and response.request.resource_type in ("fetch", "xhr"):
            task = asyncio.create_task(self.read_response(response))
            self.tasks.add(task)
            task.add_done_callback(self.tasks.discard)

    async def read_response(self, response):
        try:
            if "json" not in (await response.all_headers()).get("content-type", "").lower():
                return
            data = await response.json()
            for question in walk_json(data):
                if question.get("image"):
                    question["image"] = urljoin(response.url, question["image"])
                self.add(question)
        except Exception:
            # Responses may be interrupted or have a misleading content type.
            pass

    def export(self):
        with (OUTPUT / "socrative_questions.json").open("w", encoding="utf-8") as f:
            json.dump(self.questions, f, ensure_ascii=False, indent=2)
        with (OUTPUT / "socrative_questions.csv").open("w", encoding="utf-8-sig", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=["number", "type", "question", "choices", "image"])
            writer.writeheader()
            for question in self.questions:
                writer.writerow({**question, "choices": json.dumps(question["choices"], ensure_ascii=False)})
        print(f"export completed: {len(self.questions)} question(s), in {OUTPUT}", flush=True)


# Conservative selectors: if the site changes its markup, an empty result is safer
# than exporting navigation or login text as a question.
DOM_SCRIPT = r"""() => {
  const visible = e => !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  const pick = (root, selectors) => selectors.flatMap(s => [...root.querySelectorAll(s)]).filter(visible);
  const roots = pick(document, ['[data-question-id]', '[data-testid*="question"]',
    '.question-container', '.question-content', '.question', 'article']);
  for (const root of roots) {
    const prompts = pick(root, ['[data-testid="question-text"]', '.question-text',
      '.question-prompt', '.prompt', 'h1', 'h2', 'h3']);
    const prompt = prompts[0];
    if (!prompt || !prompt.innerText.trim()) continue;
    const options = pick(root, ['[data-testid*="answer-option"]', '.answer-option',
      '.choice', 'label']).map(e => e.innerText.trim()).filter(Boolean);
    const image = pick(root, ['img'])[0];
    const numberText = (root.innerText.match(/(?:question|câu)\s*(\d+)/i) || [])[1];
    return {question: prompt.innerText.trim(), choices: [...new Set(options)],
      number: numberText || null, image: image ? image.src : null,
      id: root.getAttribute('data-question-id')};
  }
  return null;
}"""


async def poll_dom(page, capture):
    while capture.started and not page.is_closed():
        try:
            result = await page.evaluate(DOM_SCRIPT)
            if result:
                capture.add({"number": result.get("number"), "question": result["question"],
                             "choices": result["choices"], "image": result.get("image"),
                             "type": normalize_type("", result["choices"]), "_id": result.get("id")})
        except Exception:
            pass  # A navigation can temporarily destroy the page context.
        await asyncio.sleep(1)


async def main():
    capture = Capture()
    async with async_playwright() as playwright:
        with tempfile.TemporaryDirectory(prefix="socrative-brave-") as wrapper_dir:
            brave_path = find_brave(wrapper_dir)
            print(f"Brave executable: {brave_path}", flush=True)
            browser = await playwright.chromium.launch(headless=False, executable_path=brave_path)
            page = await browser.new_page()
            page.on("response", capture.response)
            await page.goto(URL, wait_until="domcontentloaded")
            print("browser opened: log in and enter your quiz manually.", flush=True)
            await asyncio.to_thread(input, "Press Enter to start capture... ")
            capture.started = True
            print("capture started: navigate the quiz yourself; press Enter here to finish.", flush=True)
            polling = asyncio.create_task(poll_dom(page, capture))
            try:
                await asyncio.to_thread(input, "")
            finally:
                capture.started = False
                await polling
                if capture.tasks:
                    await asyncio.gather(*list(capture.tasks), return_exceptions=True)
                capture.export()
                await browser.close()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Interrupted. Start again and press Enter to export normally.")
