import re, json, os

lessons = ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3']

# Load exam priority terms
exam_terms = set()
with open('knowledge/Exam-Priority-quizlet-kanji.txt', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        term = line.split('\t')[0].strip()
        exam_terms.add(term)

kana_to_romaji_map = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'ケ': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'ニュ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'リュ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ギュ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
    'びゃ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
    'ぴゃ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'で': 'de', 'ド': 'do',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
    'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
    'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
    'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
    'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
    'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
    'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
    'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
    'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
    'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
    'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
}

def to_romaji(text):
    text = re.sub(r'[\(\)（）／/～~\+\s–—\-\[\]\.\?？!！]', '', text)
    if text == 'カメラ': return 'camera'
    res = []
    i = 0
    while i < len(text):
        if i + 1 < len(text) and text[i:i+2] in kana_to_romaji_map:
            res.append(kana_to_romaji_map[text[i:i+2]])
            i += 2
        elif text[i] in kana_to_romaji_map:
            res.append(kana_to_romaji_map[text[i]])
            i += 1
        elif text[i] in ['っ', 'ッ']:
            if i + 1 < len(text):
                nxt = to_romaji(text[i+1:])
                if nxt:
                    res.append(nxt[0])
            i += 1
        elif text[i] in ['ー', '-']:
            i += 1
        else:
            res.append(text[i].lower())
            i += 1
    slug = ''.join(res)
    slug = re.sub(r'[^a-z0-9]+', '', slug)
    return slug[:20] if slug else 'item'

def parse_jp_term(jp):
    if jp.startswith('(お)') or jp.startswith('（お）') or jp.startswith('（どうも）') or jp.startswith('これ') or jp.startswith('それ') or jp.startswith('あれ') or jp.startswith('どれ') or jp.startswith('ここ') or jp.startswith('そこ') or jp.startswith('あそこ') or jp.startswith('どこ') or jp.startswith('いちご') or jp.startswith('りんご'):
        return None, jp
    
    has_kanji = bool(re.search(r'[\u4e00-\u9faf]', jp))
    if not has_kanji:
        return None, jp
    
    m = re.match(r'^([^\(（]+)[（\(]([^\)）]+)[）\)](.*)$', jp)
    if m:
        kanji_part = m.group(1).strip()
        kana_part = m.group(2).strip()
        trailing = m.group(3).strip()
        if trailing:
            if trailing.startswith('／') or trailing.startswith('/'):
                kana_part = kana_part + trailing
        return kanji_part, kana_part

    return None, jp

all_lesson_cards = []
lesson_cards_map = {}
global_seen_ids = set()

for num in lessons:
    fpath = f'knowledge/Bai-{num}-quizlet-kanji.txt'
    cards = []
    lesson_seen_ids = set()
    with open(fpath, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            term, pron = line.split('\t')
            jp, vi = re.split(r'\s+[—–-]\s+', term, maxsplit=1)
            jp = jp.strip()
            vi = vi.strip()
            pron = pron.strip()
            kanji, kana = parse_jp_term(jp)

            slug = to_romaji(jp)
            prefix = num.replace('.', '-')
            card_id = f'{prefix}-{slug}'
            if card_id in lesson_seen_ids:
                card_id = f'{prefix}-{slug}-{idx}'
            lesson_seen_ids.add(card_id)
            global_seen_ids.add(card_id)

            is_exam = term in exam_terms

            card_obj = {
                'id': card_id,
                'lesson': num,
                'kana': kana,
                'vietnamese': vi,
                'pronunciation': pron,
                'priority': 'high' if is_exam else 'normal',
                'japanese': jp,
                'frontText': term
            }
            if kanji is not None:
                card_obj['kanji'] = kanji

            cards.append(card_obj)
    
    lesson_cards_map[num] = cards
    all_lesson_cards.extend(cards)

# Build Exam Priority Cards in exact order from Exam-Priority-quizlet-kanji.txt
exam_priority_cards = []
term_to_card = {c['frontText']: c for c in all_lesson_cards}
with open('knowledge/Exam-Priority-quizlet-kanji.txt', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f, 1):
        line = line.strip()
        if not line:
            continue
        term = line.split('\t')[0].strip()
        if term in term_to_card:
            # We copy the card and ensure priority is high
            c = dict(term_to_card[term])
            c['priority'] = 'high'
            exam_priority_cards.append(c)
        else:
            print(f'Error: exam term not found in lesson cards: {term}')

print(f'Exam priority cards: {len(exam_priority_cards)}')

# Write lesson files
for num in lessons:
    cards = lesson_cards_map[num]
    file_name = f"lesson-{num.replace('.', '-')}.ts"
    var_name = f"lesson{num.replace('.', '_')}Cards"
    
    ts_code = f"""import {{ VocabularyCard, FlashCard }} from '../../types';

export const {var_name}: (VocabularyCard & FlashCard)[] = {json.dumps(cards, ensure_ascii=False, indent=2)};
"""
    with open(f'src/data/vocabulary/{file_name}', 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print(f'Wrote src/data/vocabulary/{file_name} ({len(cards)} cards)')

# Write exam-priority.ts
exam_ts = f"""import {{ VocabularyCard, FlashCard }} from '../../types';

export const examPriorityCards: (VocabularyCard & FlashCard)[] = {json.dumps(exam_priority_cards, ensure_ascii=False, indent=2)};
"""
with open('src/data/vocabulary/exam-priority.ts', 'w', encoding='utf-8') as f:
    f.write(exam_ts)
print(f'Wrote src/data/vocabulary/exam-priority.ts ({len(exam_priority_cards)} cards)')

# Write index.ts
import_statements = ["import { VocabularyCard, FlashCard } from '../../types';"]
for num in lessons:
    var_name = f"lesson{num.replace('.', '_')}Cards"
    file_name = f"lesson-{num.replace('.', '-')}"
    import_statements.append(f"import {{ {var_name} }} from './{file_name}';")
import_statements.append("import { examPriorityCards } from './exam-priority';")

export_list = [f"  lesson{num.replace('.', '_')}Cards" for num in lessons]
export_list.append("  examPriorityCards")

# Legacy aliases for backward compatibility with Agent 1
alias_list = []
for num in lessons:
    v_old = f"bai{num.replace('.', '_')}Cards"
    v_new = f"lesson{num.replace('.', '_')}Cards"
    alias_list.append(f"export const {v_old} = {v_new};")

deck_entries = []
for num in lessons:
    v_new = f"lesson{num.replace('.', '_')}Cards"
    deck_entries.append(f"  {{ id: 'Bài {num}', label: 'Bài {num}', cards: {v_new} }}")
deck_entries.append("  { id: 'Exam Priority', label: 'Exam Priority', cards: examPriorityCards }")
deck_entries.append("  { id: 'All', label: 'Tất cả (Bài 1.1 → 3.3)', cards: allLessonCards }")

index_ts = f"""{chr(10).join(import_statements)}

export {{
{chr(10).join(export_list)}
}};

// Aliases for backward compatibility
{chr(10).join(alias_list)}

export const allLessonCards: (VocabularyCard & FlashCard)[] = [
  {', '.join([f"...lesson{num.replace('.', '_')}Cards" for num in lessons])}
];

export const DECKS: {{ id: string; label: string; cards: FlashCard[] }}[] = [
{chr(10).join(deck_entries)}
];
"""

with open('src/data/vocabulary/index.ts', 'w', encoding='utf-8') as f:
    f.write(index_ts)
print('Wrote src/data/vocabulary/index.ts successfully!')
