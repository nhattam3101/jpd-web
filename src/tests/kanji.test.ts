import { describe, it, expect } from 'vitest';
import { allKanji, examPriority, kanjiDecks } from '../data/kanji';
import { examPriorityWords } from '../data/kanji/examPriority';
const find=(s:string)=>allKanji.find(c=>c.kanji===s);
describe('Kanji course data',()=>{
 it('has unique cards with readings and meanings',()=>{expect(allKanji.length).toBeGreaterThan(0);expect(new Set(allKanji.map(c=>c.id)).size).toBe(allKanji.length);expect(new Set(allKanji.map(c=>c.kanji)).size).toBe(allKanji.length);for(const c of allKanji){expect(c.meaning.trim()).toBeTruthy();expect(c.readings.every(r=>!!r.trim())).toBe(true);expect(c.readings.length).toBeGreaterThan(0);}});
 it('exam priority is a complete subset',()=>{expect(examPriority.map(c=>c.kanji).sort()).toEqual([...examPriorityWords].sort());});
 it('references existing cards in examples',()=>{for(const c of allKanji) for(const e of c.examples || []) expect(find(e.word)).toBeDefined();});
 it('contains number deck and special date, month and time readings',()=>{const deck=kanjiDecks.find(d=>d.id==='numbers')!;for(const k of '一二三四五六七八九十百千万円') expect(deck.cards.some(c=>c.kanji===k)).toBe(true);for(const [k,r] of Object.entries({'四月':'しがつ','七月':'しちがつ','九月':'くがつ','一日':'ついたち','十四日':'じゅうよっか','二十日':'はつか','二十四日':'にじゅうよっか','四時':'よじ','十分':'じゅっぷん'})) expect(find(k)?.readings).toContain(r);});
 it('contains all seven weekdays',()=>{for(const k of ['月','火','水','木','金','土','日']) expect(find(`${k}曜日`)).toBeDefined();});
});
