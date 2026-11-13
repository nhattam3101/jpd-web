import { allKanji, examPriority, kanjiDecks } from '../src/data/kanji';
import { examPriorityWords } from '../src/data/kanji/examPriority';
const single = allKanji.filter(c => [...c.kanji].length === 1);
const errors: string[] = [];
const unique = (values: string[], label: string) => { if (new Set(values).size !== values.length) errors.push(`${label} bị trùng`); };
unique(allKanji.map(c=>c.id),'ID'); unique(allKanji.map(c=>c.kanji),'Kanji');
for (const c of allKanji) { if (!c.meaning.trim() || !c.readings.length || c.readings.some(r=>!r.trim())) errors.push(`Thiếu nghĩa/cách đọc: ${c.kanji}`); for (const e of c.examples || []) if (!allKanji.some(x=>x.kanji===e.word)) errors.push(`Ví dụ không có nguồn: ${e.word}`); }
for (const word of examPriorityWords) if (!allKanji.some(c=>c.kanji===word)) errors.push(`Thiếu ưu tiên thi: ${word}`);
console.log(`Kanji đơn: ${single.length}\nKanji số: ${single.filter(c=>c.category==='number').length}\nTừ ghép: ${allKanji.filter(c=>[...c.kanji].length>1).length}\nExam Priority: ${examPriority.length}\nKanji không có ví dụ: ${single.filter(c=>!c.examples?.length).map(c=>c.kanji).join('、') || '0'}\nKanji không có cách đọc: ${allKanji.filter(c=>!c.readings.length || c.readings.some(r=>!r.trim())).length}\nBộ thẻ: ${kanjiDecks.length}\nCoverage: ${errors.length ? 'có lỗi' : '100% yêu cầu dữ liệu được kiểm tra'}`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
