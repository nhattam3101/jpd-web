import glob, os, re, json

os.makedirs('src/data/vocabulary', exist_ok=True)

exam_file = 'knowledge/Exam-Priority-quizlet-kanji.txt'
exam_keys = set()
with open(exam_file, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split('\t')
        exam_keys.add(parts[0].strip())

file_map = [
    ('knowledge/Bai-1.1-quizlet-kanji.txt', 'bai1_1', 'Bài 1.1'),
    ('knowledge/Bai-1.2-quizlet-kanji.txt', 'bai1_2', 'Bài 1.2'),
    ('knowledge/Bai-1.3-quizlet-kanji.txt', 'bai1_3', 'Bài 1.3'),
    ('knowledge/Bai-2.1-quizlet-kanji.txt', 'bai2_1', 'Bài 2.1'),
    ('knowledge/Bai-2.2-quizlet-kanji.txt', 'bai2_2', 'Bài 2.2'),
    ('knowledge/Bai-2.3-quizlet-kanji.txt', 'bai2_3', 'Bài 2.3'),
    ('knowledge/Bai-3.1-quizlet-kanji.txt', 'bai3_1', 'Bài 3.1'),
    ('knowledge/Bai-3.2-quizlet-kanji.txt', 'bai3_2', 'Bài 3.2'),
    ('knowledge/Bai-3.3-quizlet-kanji.txt', 'bai3_3', 'Bài 3.3'),
    ('knowledge/Exam-Priority-quizlet-kanji.txt', 'examPriority', 'Exam Priority'),
]

all_exports = []

for file_path, var_name, lesson_label in file_map:
    cards = []
    with open(file_path, 'r', encoding='utf-8') as fp:
        for idx, line in enumerate(fp):
            line = line.strip()
            if not line:
                continue
            parts = line.split('\t')
            front = parts[0].strip()
            back = parts[1].strip() if len(parts) > 1 else ''

            # split front into japanese and vietnamese
            m = re.split(r'\s+[—–-]\s+', front, maxsplit=1)
            jp = m[0].strip()
            vi = m[1].strip() if len(m) > 1 else ''

            # extract kana if in parentheses
            kana_match = re.search(r'[（\(]([^）\)]+)[）\)]', jp)
            kana = kana_match.group(1).strip() if kana_match else ''

            is_exam = front in exam_keys

            card = {
                'id': f'{var_name}_{idx+1}',
                'lesson': lesson_label,
                'japanese': jp,
                'kana': kana,
                'vietnamese': vi,
                'pronunciation': back,
                'priority': 'high' if is_exam else 'normal',
                'frontText': front
            }
            cards.append(card)

    ts_content = f'''import {{ FlashCard }} from '../../types';

export const {var_name}Cards: FlashCard[] = {json.dumps(cards, ensure_ascii=False, indent=2)};
'''
    with open(f'src/data/vocabulary/{var_name}.ts', 'w', encoding='utf-8') as out_f:
        out_f.write(ts_content)

    all_exports.append((var_name, lesson_label, len(cards)))
    print(f'Wrote src/data/vocabulary/{var_name}.ts ({len(cards)} cards)')

# Build index.ts
import_lines = ["import { FlashCard } from '../../types';"]
for var_name, _, _ in all_exports:
    import_lines.append(f"import {{ {var_name}Cards }} from './{var_name}';")

export_list = ',\n'.join(f'  {var_name}Cards' for var_name, _, _ in all_exports)
lesson_vars = [var_name for var_name, label, _ in all_exports if var_name != 'examPriority']
all_lesson_spread = ', ...'.join(f'{v}Cards' for v in lesson_vars)

deck_entries = []
for var_name, label, _ in all_exports:
    deck_entries.append(f"  {{ id: '{label}', label: '{label}', cards: {var_name}Cards }}")
deck_entries.append("  { id: 'All', label: 'Tất cả (Bài 1.1 → 3.3)', cards: allLessonCards }")
deck_entries_str = ',\n'.join(deck_entries)

index_content = f'''{chr(10).join(import_lines)}

export {{
{export_list}
}};

export const allLessonCards: FlashCard[] = [
  ...{all_lesson_spread}
];

export const DECKS: {{ id: string; label: string; cards: FlashCard[] }}[] = [
{deck_entries_str}
];
'''

with open('src/data/vocabulary/index.ts', 'w', encoding='utf-8') as out_f:
    out_f.write(index_content)

print('Generated src/data/vocabulary/index.ts successfully!')
