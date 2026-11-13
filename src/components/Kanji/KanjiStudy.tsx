import { useEffect, useMemo, useState } from 'react';
import { allKanji, kanjiDecks } from '../../data/kanji';
import type { KanjiCard } from '../../data/kanji';

const key = 'nihonstep_kanji_progress_v1';
type Progress = Record<string, 'known' | 'unknown'>;
type Mode = 'reading' | 'meaning' | 'compound' | 'reverse' | 'number' | 'numeric';
const modes: [Mode,string][] = [['reading','Kanji → Cách đọc'],['meaning','Kanji → Nghĩa'],['compound','Từ ghép → Cách đọc'],['reverse','Cách đọc → Kanji'],['number','Số → Kanji'],['numeric','Kanji → số']];
const shuffle = <T,>(items:T[]) => { const copy=[...items]; for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [copy[i],copy[j]]=[copy[j],copy[i]];} return copy; };
const load = (): Progress => { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; } };
const button = 'min-h-11 px-4 py-2 rounded-xl border border-sage bg-paper-pure hover:bg-mint-soft font-semibold text-sm transition-colors';

export function KanjiStudy() {
 const [deckId,setDeckId]=useState<string | null>(null); const [mode,setMode]=useState<Mode>('reading'); const [progress,setProgress]=useState<Progress>(load); const [unknown,setUnknown]=useState(false); const [order,setOrder]=useState<string[] | null>(null); const [index,setIndex]=useState(0); const [revealed,setRevealed]=useState(false); const [quiz,setQuiz]=useState<KanjiCard[] | null>(null); const [quizModes,setQuizModes]=useState<Mode[]>([]);
 const deck=kanjiDecks.find(d=>d.id===deckId);
 const eligible=useMemo(()=>{let list=(deck?.cards || []).filter(c => mode==='compound' ? c.kanji.length>1 : mode==='number'||mode==='numeric' ? c.value !== undefined : true); if(unknown) list=list.filter(c=>progress[c.id]!=='known'); if(order) list.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id)); return list;},[deck,mode,unknown,order,progress]);
 const cards=quiz || eligible; const current=cards[Math.min(index,cards.length-1)]; const activeMode=quiz ? quizModes[index] : mode;
 const prompt=(c:KanjiCard) => activeMode==='reverse' ? c.readings.join(' / ') : activeMode==='number' ? String(c.value) : c.kanji;
 const answer=(c:KanjiCard) => activeMode==='reverse'||activeMode==='number' ? c.kanji : activeMode==='meaning' ? c.meaning : activeMode==='numeric' ? String(c.value) : c.readings.join(' / ');
 const move=(delta:number)=>{setIndex(i=>Math.max(0,Math.min(cards.length-1,i+delta)));setRevealed(false);};
 useEffect(()=>{
  const onKeyDown=(event:KeyboardEvent)=>{
   if(event.altKey || event.ctrlKey || event.metaKey || event.repeat || event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement || (event.target instanceof HTMLElement && event.target.isContentEditable)) return;
   if(event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
   if(!cards.length) return;
   event.preventDefault();
   setIndex(i=>Math.max(0,Math.min(cards.length-1,i+(event.key==='ArrowRight'?1:-1))));
   setRevealed(false);
  };
  window.addEventListener('keydown',onKeyDown);
  return ()=>window.removeEventListener('keydown',onKeyDown);
 },[cards.length]);
 const mark=(status:'known'|'unknown')=>{if(!current)return; const next={...progress,[current.id]:status}; setProgress(next); try {localStorage.setItem(key,JSON.stringify(next));} catch { /* storage may be unavailable */ } if(unknown && status==='known') setIndex(i=>Math.max(0,Math.min(i,eligible.length-2))); else move(1); setRevealed(false);};
 const startQuiz=()=>{setQuiz(shuffle(allKanji.filter(c=>c.kanji.length>1)).slice(0,10));setQuizModes(Array.from({length:10},()=>shuffle<Mode>(['reading','reverse','meaning'])[0]));setIndex(0);setRevealed(false);};
 const choose=(id:string)=>{setDeckId(id);setMode('reading');setOrder(null);setIndex(0);setRevealed(false);setQuiz(null);};
 if(!deckId && !quiz) return <div className="max-w-5xl mx-auto px-4 py-10"><h1 className="text-3xl font-bold">Học Kanji</h1><p className="mt-2 text-ink-pencil">Ôn chữ và từ ghép theo nội dung lớp học.</p><div className="grid sm:grid-cols-2 gap-4 mt-8">{kanjiDecks.map(d=><button key={d.id} onClick={()=>choose(d.id)} className="text-left p-6 rounded-2xl border border-sage bg-paper-pure hover:bg-mint-soft transition-colors"><span className="block text-xl font-bold">{d.label}</span><span className="block mt-2 text-sm text-ink-pencil">{d.cards.length} thẻ · Chọn để học →</span></button>)}</div><button onClick={startQuiz} className="mt-6 w-full text-left p-6 rounded-2xl bg-aizome text-white"><strong className="text-xl">Kanji Quick Test</strong><span className="block mt-1 text-sm">10 câu ngẫu nhiên · tự nhớ và xem đáp án</span></button></div>;
 return <div className="max-w-3xl mx-auto px-4 py-8"><button className={button} onClick={()=>{setDeckId(null);setQuiz(null);setIndex(0);}}>← Các bộ Kanji</button><div className="flex flex-wrap items-end justify-between gap-3 mt-6"><div><h1 className="text-2xl font-bold">{quiz?'Kanji Quick Test':deck?.label}</h1><p className="text-sm text-ink-pencil mt-1">{quiz ? 'Tự trả lời trước khi xem đáp án' : `${deck?.cards.filter(c=>progress[c.id]==='known').length} / ${deck?.cards.length} thẻ đã thuộc`}</p></div><span className="text-sm tabular-nums">{cards.length ? Math.min(index+1,cards.length) : 0} / {cards.length}</span></div>
 {!quiz && <div className="flex flex-wrap gap-3 mt-5"><label className="text-sm font-semibold">Chế độ <select value={mode} onChange={e=>{setMode(e.target.value as Mode);setIndex(0);setRevealed(false);}} className="ml-2 p-2 rounded-lg border border-sage bg-paper-pure">{modes.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={unknown} onChange={e=>{setUnknown(e.target.checked);setIndex(0);}}/> Chỉ ôn chưa thuộc</label><button className={button} onClick={()=>{setOrder(shuffle((deck?.cards || []).map(c=>c.id)));setIndex(0);setRevealed(false);}}>Xáo trộn</button></div>}
 {current ? <><button key={current.id} type="button" onClick={()=>setRevealed(v=>!v)} className="flashcard-stage flashcard-swap block mt-6 w-full h-80 sm:h-96 cursor-pointer select-none text-center rounded-2xl" aria-label={revealed?'Quay lại mặt trước của thẻ':'Lật thẻ để xem đáp án'} aria-pressed={revealed}>
 <span className={`flashcard-flipper relative block w-full h-full transform-style-3d ${revealed ? 'rotate-y-180' : ''}`}>
  <span aria-hidden={revealed} className="flashcard-face flashcard-front study-panel absolute inset-0 backface-hidden bg-paper-pure border border-rule rounded-2xl p-6 sm:p-9 flex flex-col justify-between">
   <span className="text-xs text-ink-pencil text-left">{quiz ? modes.find(([v])=>v===activeMode)?.[1] : modes.find(([v])=>v===mode)?.[1]}</span>
   <span lang="ja" className="block my-auto text-5xl sm:text-6xl font-medium font-jp break-words">{prompt(current)}</span>
   <span className="text-xs text-ink-pencil">Bấm thẻ hoặc Space để lật · ← → để chuyển thẻ</span>
  </span>
  <span aria-hidden={!revealed} className="flashcard-face flashcard-back study-panel absolute inset-0 backface-hidden rounded-2xl p-6 sm:p-9 flex flex-col justify-between">
   <span className="text-xs text-ink-pencil text-left">Đáp án</span>
   <span className="block my-auto overflow-y-auto"><span lang="ja" className="block text-3xl sm:text-4xl font-medium font-jp break-words">{answer(current)}</span><span className="block mt-4 text-ink-pencil text-base"><span lang="ja">{current.readings.join(' / ')}</span> · {current.meaning}{current.examples?.slice(0,2).map(e=><span key={e.word} className="block mt-2"><span lang="ja">{e.word}（{e.reading}）</span> · {e.meaning}</span>)}{current.notes && <span className="block mt-2">{current.notes}</span>}</span></span>
   <span className="text-xs text-ink-pencil">Bấm thẻ hoặc phím Space để quay lại</span>
  </span>
 </span>
 </button><div className="flex flex-wrap justify-center gap-2 mt-4"><button className={button} onClick={()=>move(-1)} disabled={index===0}>← Trước</button>{!quiz && <><button className={button} onClick={()=>mark('unknown')}>Chưa thuộc</button><button className={button} onClick={()=>mark('known')}>Đã thuộc</button></>}<button className={button} onClick={()=>move(1)} disabled={index>=cards.length-1}>Tiếp →</button></div>{quiz && index===cards.length-1 && <button className={`${button} block mx-auto mt-4`} onClick={startQuiz}>Làm lại 10 câu</button>}</> : <p className="mt-8 p-8 rounded-2xl bg-paper-pure text-center">Không có thẻ phù hợp. Hãy đổi chế độ hoặc bỏ lọc chưa thuộc.</p>}
 {!quiz && <button className="block mx-auto mt-8 text-sm text-ink-pencil underline" onClick={()=>{if(window.confirm('Đặt lại tiến độ của bộ Kanji này?')){const next={...progress};deck?.cards.forEach(c=>delete next[c.id]);setProgress(next);try{localStorage.setItem(key,JSON.stringify(next));}catch{/* unavailable */}setIndex(0);setRevealed(false);}}}>Đặt lại tiến độ bộ này</button>}</div>;
}
