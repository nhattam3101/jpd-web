import { numbers } from './numbers'; import { basic } from './basic'; import { compounds } from './compounds'; import { dates } from './dates'; import { weekdays } from './weekdays'; import { time, counters } from './time'; import { examPriorityWords } from './examPriority';
export type { KanjiCard } from './types';
const raw = [...numbers,...basic,...compounds,...dates,...weekdays,...time,...counters];
// Examples only refer to explicitly supplied course words and are shared by every deck.
export const allKanji = raw.map(c => ({...c, examples: c.kanji.length === 1 ? [...raw.filter(x => x.kanji !== c.kanji && x.kanji.includes(c.kanji)).map(x=>({word:x.kanji,reading:x.readings.join(' / '),meaning:x.meaning})), ...(c.kanji === '十' ? [{word:'十',reading:'とお',meaning:'Mười cái'}] : [])] : undefined}));
export const examPriority = allKanji.filter(c => examPriorityWords.includes(c.kanji));
export const kanjiDecks = [{id:'numbers',label:'Kanji Số',cards:allKanji.filter(c=>c.category==='number'||c.category==='money'||['一人','二人','三人','四人','三百','八千'].includes(c.kanji))},{id:'basic',label:'Kanji Cơ Bản',cards:allKanji.filter(c=>c.kanji.length===1)},{id:'compounds',label:'Kanji Từ Ghép',cards:allKanji.filter(c=>c.kanji.length>1||c.kanji==='私')},{id:'exam',label:'Kanji Ưu Tiên Thi',cards:examPriority}];
