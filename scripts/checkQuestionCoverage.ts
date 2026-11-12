import { allLessonCards, examPriorityCards } from '../src/data/vocabulary';
import { questionPatterns } from '../src/data/questionPatterns';
import { readingTests } from '../src/data/readingTests';

// Lexical substring matching is an estimate: Japanese has no word boundaries and
// a kana spelling can be part of another word. Lists retain distinct card IDs.
const text = [...readingTests.map(r => r.text), ...questionPatterns.flatMap(p => p.examples.flatMap(e => [e.question, e.answer]))].join('\n');
const normalize = (s: string) => s.replace(/[\s　]/g, '').normalize('NFKC');
const corpus = normalize(text);
function isUsed(card: typeof allLessonCards[number]) {
  const candidates = [card.kana, card.kanji].filter((v): v is string => !!v && v.length >= 2 && !/[()（）／〜～]/.test(v));
  return candidates.some(v => corpus.includes(normalize(v)));
}
function report(label: string, cards: typeof allLessonCards) {
  const used = cards.filter(isUsed);
  const missing = cards.filter(c => !isUsed(c));
  console.log(`${label}: ${used.length}/${cards.length} (${(100 * used.length / cards.length).toFixed(1)}%)`);
  console.log(`Chưa khớp: ${missing.map(c => `${c.kana} [${c.id}]`).join(', ')}`);
}
report('Vocabulary Bài 1–3 (theo ID)', allLessonCards);
report('Exam Priority (theo ID)', examPriorityCards);
const covered = questionPatterns.filter(p => p.examples.length > 0).length;
console.log(`Pattern Coverage: ${covered}/${questionPatterns.length} (${(100*covered/questionPatterns.length).toFixed(1)}%)`);
console.log(`Question Coverage: ${questionPatterns.reduce((sum,p) => sum + p.examples.length,0)} ví dụ`);
