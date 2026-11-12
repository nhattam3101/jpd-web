const cp = require('child_process');
const fs = require('fs');

const OUT_DIR = '/home/nhattam3101/.gemini/antigravity/brain/1727d3f0-3d73-4662-836b-c3c44dc5d94f';

async function run() {
  const chrome = cp.spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=1280,860',
    'http://localhost:4173'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const res = await fetch('http://localhost:9222/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.type === 'page');
    if (!pageTab) throw new Error('No page tab');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    let id = 1;
    const send = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      const handler = (evt) => {
        const data = JSON.parse(evt.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await new Promise(r => ws.addEventListener('open', r));

    async function takeScreenshot(filename) {
      const { data } = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${OUT_DIR}/${filename}`, Buffer.from(data, 'base64'));
      console.log(`Saved ${filename}`);
    }

    async function evaluate(expression) {
      return await send('Runtime.evaluate', { expression, awaitPromise: true });
    }

    // 1. Home Screenshot
    await new Promise(r => setTimeout(r, 600));
    await takeScreenshot('ui_home.png');

    // 2. Click "Học từ vựng" in nav or card
    await evaluate(`
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Học từ vựng'));
      if (btn) btn.click();
    `);
    await new Promise(r => setTimeout(r, 700));
    await takeScreenshot('ui_flashcard.png');

    // 3. Click "Thi thử"
    await evaluate(`
      const navButtons = Array.from(document.querySelectorAll('nav button'));
      const mockBtn = navButtons.find(b => b.textContent.includes('Thi thử'));
      if (mockBtn) mockBtn.click();
    `);
    await new Promise(r => setTimeout(r, 700));
    await takeScreenshot('ui_mock_test_intro.png');

    // 4. Click "Bắt đầu bài thi"
    await evaluate(`
      const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Bắt đầu bài thi'));
      if (startBtn) startBtn.click();
    `);
    await new Promise(r => setTimeout(r, 700));
    await takeScreenshot('ui_mock_test_reading.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
