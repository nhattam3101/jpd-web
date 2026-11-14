import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Filter, RotateCcw, RotateCw, Shuffle, X } from 'lucide-react';
import type { NumberEntry } from '../../data/numbers';

type Status = 'known' | 'unknown';
type StatusMap = Record<string, Status>;
const storageKey = 'nihonstep_number_cards_v1';
function load(): StatusMap { try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { return {}; } }
function save(value: StatusMap) { try { localStorage.setItem(storageKey, JSON.stringify(value)); } catch { /* Continue the session without persistence. */ } }
function shuffle<T>(items: T[]): T[] { const result = [...items]; for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; } return result; }

export function NumberFlashcards({ cards, label }: { cards: NumberEntry[]; label: string }) {
 const [statuses, setStatuses] = useState<StatusMap>(load);
 const [onlyUnknown, setOnlyUnknown] = useState(false);
 const [shuffled, setShuffled] = useState(false);
 const [order, setOrder] = useState<string[]>([]);
 const [index, setIndex] = useState(0);
 const [flipped, setFlipped] = useState(false);
 const active = useMemo(() => {
   let list = cards.filter(c => !onlyUnknown || statuses[c.id] !== 'known');
   if (shuffled) { const positions = new Map(order.map((id, i) => [id, i])); list = [...list].sort((a, b) => (positions.get(a.id) ?? Infinity) - (positions.get(b.id) ?? Infinity)); }
   return list;
 }, [cards, onlyUnknown, statuses, shuffled, order]);
 const safeIndex = Math.min(index, Math.max(0, active.length - 1));
 const card = active[safeIndex];
 const known = cards.filter(c => statuses[c.id] === 'known').length;
 const unknown = cards.filter(c => statuses[c.id] === 'unknown').length;
 const move = (delta: number) => { if (!active.length) return; setIndex((safeIndex + delta + active.length) % active.length); setFlipped(false); };
 const mark = (status: Status) => { if (!card) return; const updated = { ...statuses, [card.id]: status }; setStatuses(updated); save(updated); setFlipped(false); setIndex(onlyUnknown && status === 'known' ? safeIndex : (safeIndex + 1) % active.length); };
 useEffect(() => { setIndex(0); setFlipped(false); setOnlyUnknown(false); setShuffled(false); setOrder([]); }, [label]);
 useEffect(() => {
   const handle = (event: KeyboardEvent) => {
     if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement || (event.target instanceof HTMLElement && event.target.isContentEditable)) return;
     if (event.code === 'Space') { event.preventDefault(); setFlipped(v => !v); }
     else if (event.code === 'ArrowLeft') { event.preventDefault(); move(-1); }
     else if (event.code === 'ArrowRight') { event.preventDefault(); move(1); }
     else if (event.key === '1') { event.preventDefault(); mark('unknown'); }
     else if (event.key === '2') { event.preventDefault(); mark('known'); }
   };
   window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle);
 });
 const reset = () => { if (!window.confirm('Đặt lại trạng thái đã thuộc và chưa thuộc của nhóm thẻ này?')) return; const updated = { ...statuses }; cards.forEach(c => delete updated[c.id]); setStatuses(updated); save(updated); setIndex(0); setFlipped(false); };
 return <div className="w-full max-w-xl mx-auto">
   <div className="flex flex-wrap items-center gap-2 mb-5">
     <button onClick={() => { setOnlyUnknown(v => !v); setIndex(0); setFlipped(false); }} aria-pressed={onlyUnknown} className={`min-h-10 px-3 rounded-xl border flex items-center gap-2 text-sm ${onlyUnknown ? 'bg-hanko-subtle border-hanko-border text-hanko' : 'bg-paper-pure border-rule'}`}><Filter className="w-4 h-4"/>Chưa thuộc ({cards.length - known})</button>
     <button onClick={() => { if (!shuffled) setOrder(shuffle(cards.map(c => c.id))); setShuffled(v => !v); setIndex(0); setFlipped(false); }} aria-pressed={shuffled} aria-label="Xáo trộn thẻ" title="Xáo trộn thẻ" className={`w-10 h-10 rounded-xl border flex items-center justify-center ${shuffled ? 'bg-aizome text-white border-aizome' : 'bg-paper-pure border-rule'}`}><Shuffle className="w-4 h-4"/></button>
     <button onClick={reset} aria-label="Đặt lại tiến độ nhóm thẻ" title="Đặt lại tiến độ nhóm thẻ" className="w-10 h-10 rounded-xl border border-rule bg-paper-pure flex items-center justify-center"><RotateCcw className="w-4 h-4"/></button>
   </div>
   <div className="flex justify-between gap-3 text-xs text-ink-pencil mb-2"><span>{active.length ? safeIndex + 1 : 0} / {active.length}</span><span>Thuộc: {known} · Chưa: {unknown}</span></div>
   <div className="bg-paper-dark h-1 rounded-full overflow-hidden mb-6"><div className="bg-aizome h-full" style={{width: `${active.length ? (safeIndex + 1) / active.length * 100 : 0}%`}}/></div>
   {card ? <div key={card.id} className="flashcard-stage flashcard-swap w-full h-80 sm:h-96 cursor-pointer select-none" onClick={() => setFlipped(v => !v)} role="button" tabIndex={0} aria-label={flipped ? 'Quay lại mặt trước của thẻ' : 'Lật thẻ để xem cách đọc'} aria-pressed={flipped} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); setFlipped(v => !v); } }}>
     <div className={`flashcard-flipper relative w-full h-full transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
       <div className="flashcard-face flashcard-front study-panel absolute w-full h-full backface-hidden bg-paper-pure border border-rule rounded-2xl p-7 flex flex-col justify-between"><div className="flex justify-between text-xs text-ink-pencil"><span>{label}</span><span>{card.isException ? 'Ngoại lệ · ' : ''}{statuses[card.id] === 'known' ? 'Đã thuộc' : statuses[card.id] === 'unknown' ? 'Chưa thuộc' : ''}</span></div><div className="text-center text-5xl font-medium font-jp" lang="ja">{card.display}</div><div className="text-center text-xs text-ink-muted flex items-center justify-center gap-1"><RotateCw className="w-3 h-3"/>Bấm thẻ hoặc Space để xem cách đọc</div></div>
       <div className="flashcard-face flashcard-back study-panel absolute w-full h-full backface-hidden rounded-2xl p-7 flex flex-col justify-between"><div className="text-xs text-ink-pencil">CÁCH ĐỌC · {label}</div><div className="text-center" lang="ja"><div className="text-3xl sm:text-4xl font-bold text-aizome">{card.reading}</div><div className="mt-5 text-xl">{card.display} {['basic','hundreds','thousands'].includes(card.category) && `· ${card.value}`}</div></div><div className="text-center text-xs text-ink-muted">Bấm thẻ hoặc Space để quay lại</div></div>
     </div></div> : <div className="study-panel h-80 rounded-2xl bg-paper-pure border border-rule flex flex-col items-center justify-center p-8 text-center"><Check className="w-10 h-10 text-matcha mb-3"/><h3 className="font-bold">Đã thuộc toàn bộ thẻ!</h3><button onClick={() => setOnlyUnknown(false)} className="mt-5 px-4 py-2 rounded-lg bg-aizome text-white">Ôn lại toàn bộ thẻ</button></div>}
   <div className="grid grid-cols-[44px_1fr_1fr_44px] gap-2 mt-7"><button onClick={() => move(-1)} disabled={active.length <= 1} aria-label="Thẻ trước" title="Thẻ trước (←)" className="h-11 rounded-xl bg-paper-pure border border-rule flex items-center justify-center disabled:opacity-30"><ChevronLeft className="w-5 h-5"/></button><button onClick={() => mark('unknown')} disabled={!card} className="min-h-11 rounded-xl bg-paper-pure border border-hanko-border text-hanko text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-30"><X className="w-4 h-4"/>Chưa thuộc</button><button onClick={() => mark('known')} disabled={!card} className="min-h-11 rounded-xl bg-matcha-subtle border border-matcha-border text-matcha text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-30"><Check className="w-4 h-4"/>Đã thuộc</button><button onClick={() => move(1)} disabled={active.length <= 1} aria-label="Thẻ tiếp theo" title="Thẻ tiếp theo (→)" className="h-11 rounded-xl bg-paper-pure border border-rule flex items-center justify-center disabled:opacity-30"><ChevronRight className="w-5 h-5"/></button></div>
   <p className="mt-6 text-center text-xs text-ink-muted">Space: lật thẻ · ← →: chuyển thẻ · 1: chưa thuộc · 2: đã thuộc</p>
 </div>;
}
