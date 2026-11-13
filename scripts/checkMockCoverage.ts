import { readingTests } from '../src/data/readingTests';
import { speakingQuestions } from '../src/data/speakingQuestions';
import { questionPatterns } from '../src/data/questionPatterns';
import { allKanji } from '../src/data/kanji';

const text = [...readingTests.map(r => r.text), ...speakingQuestions.flatMap(q => [q.question, ...q.expectedAnswers])].join('');
const characters = allKanji.filter(c => [...c.kanji].length === 1 && /[一-龯]/.test(c.kanji));
const found = characters.filter(c => text.includes(c.kanji));
console.log(`Reading: ${readingTests.length}; picture: ${speakingQuestions.filter(q => q.type === 'image').length}; direct: ${speakingQuestions.filter(q => q.type === 'direct').length}; patterns: ${questionPatterns.length}; kanji characters: ${found.length}/${characters.length} (${(100 * found.length / characters.length).toFixed(1)}%); mock picture categories: 3`);
