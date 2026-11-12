import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2 } from 'lucide-react';
import { questionPatterns } from '../../data/questionPatterns';

type Props = { onBackToHome: () => void };
const exercises = questionPatterns.flatMap(pattern => pattern.examples.filter(example => !example.seed).map(example => ({pattern, example})));

export function QuestionRecognition({ onBackToHome }: Props) {
  const [view, setView] = useState<'practice' | 'words'>('practice');
  const [index, setIndex] = useState(() => Math.floor(Math.random() * exercises.length));
  const [answer, setAnswer] = useState<string | null>(null);
  const [word, setWord] = useState(questionPatterns[0].id);
  const current = exercises[index];
  const options = [current.pattern, ...questionPatterns.filter(p => p.category !== current.pattern.category).slice(0, 3)];
  const ordered = [...options].sort((a, b) => a.category.localeCompare(b.category));
  const selected = questionPatterns.find(p => p.id === word)!;
  const next = () => { setIndex((index + 1 + Math.floor(Math.random() * (exercises.length - 1))) % exercises.length); setAnswer(null); };
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 py-7 sm:py-12">
    <button onClick={onBackToHome} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-ink-pencil hover:text-ink px-3 py-2 rounded-xl border border-rule bg-paper-pure hover:border-aizome shadow-paper-sm transition-all mb-7">
      <ArrowLeft className="w-4 h-4" /> Trang chủ
    </button>
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-7">
      <div><h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Nhận diện câu hỏi</h1><p className="text-sm text-ink-pencil max-w-xl">Nhìn câu hỏi, nhận ra từ hỏi và chọn ý nghĩa trước khi xem cách trả lời.</p></div>
      <div className="flex gap-1 bg-paper-subtle p-1 rounded-xl border border-rule" aria-label="Chế độ ôn tập">
        <button onClick={() => setView('practice')} className={`min-h-10 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'practice' ? 'bg-aizome text-white shadow-paper-sm' : 'text-ink-pencil hover:text-ink'}`}>Luyện tập</button>
        <button onClick={() => setView('words')} className={`min-h-10 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'words' ? 'bg-aizome text-white shadow-paper-sm' : 'text-ink-pencil hover:text-ink'}`}>Ôn từ hỏi</button>
      </div>
    </div>
    {view === 'practice' ? <section key={index} className="exam-step study-panel bg-paper-pure border border-sage rounded-2xl p-6 sm:p-9">
      {current.example.visual && <p className="text-center text-ink-pencil bg-aqua border border-mint rounded-xl p-4 mb-4">{current.example.visual}</p>}
      <p className="font-jp text-center text-2xl sm:text-4xl font-semibold py-7 sm:py-9 leading-relaxed">{current.example.question}</p>
      <p className="font-bold text-sm mb-3 text-ink">Câu này đang hỏi gì?</p>
      <div className="grid sm:grid-cols-2 gap-3">{ordered.map(p => <button key={p.id} onClick={() => setAnswer(p.category)} disabled={answer !== null} className="min-h-12 text-left bg-paper-pure border border-rule rounded-xl p-3.5 font-medium text-sm hover:border-aizome hover:bg-mint-soft transition-all disabled:cursor-default disabled:opacity-70">{p.category}</button>)}</div>
      {answer !== null && <div role="status" className="reveal-answer mt-5 p-5 bg-matcha-subtle border border-matcha-border rounded-xl space-y-2 text-sm">
        <p className="font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-matcha" />{answer === current.pattern.category ? 'Chính xác!' : `Đáp án: ${current.pattern.category}`}</p>
        <p><strong>{current.pattern.questionWord}</strong> — {current.pattern.meaning}</p>
        <p>Kiểu trả lời: {current.pattern.answerPattern}</p><p>Ví dụ: <span className="font-jp font-bold">{current.example.answer}</span></p>
      </div>}
      <button onClick={next} className="mt-6 min-h-11 px-5 py-3 bg-aizome hover:bg-aizome-hover text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98] inline-flex items-center gap-2">Câu tiếp theo <ArrowRight className="w-4 h-4" /></button>
    </section> : <section className="exam-step study-panel bg-paper-pure border border-sage rounded-2xl p-6 sm:p-9">
      <label className="block text-sm font-semibold text-ink-pencil">Từ hỏi / dạng câu
        <select value={word} onChange={e => setWord(e.target.value)} className="mt-2 w-full min-h-12 border border-rule rounded-xl p-3 bg-paper-pure text-ink">{questionPatterns.map(p => <option value={p.id} key={p.id}>{p.questionWord} — {p.category}</option>)}</select>
      </label>
      <div className="mt-6 bg-aqua border border-mint rounded-xl p-5"><BookOpenCheck className="w-5 h-5 text-aizome mb-3" /><h2 className="font-jp text-xl sm:text-2xl font-bold">{selected.pattern}</h2><p className="mt-2 text-sm">{selected.questionWord} — {selected.meaning}</p><p className="mt-2 text-sm">Kiểu trả lời: <strong>{selected.answerPattern}</strong></p></div>
      <div className="mt-6 divide-y divide-rule">{selected.examples.filter(example => !example.seed).slice(0, 8).map((example,i) => <div key={i} className="py-4 first:pt-0 text-sm"><p className="text-ink-muted mb-1">{example.visual}</p><p className="font-jp text-base">{example.question}</p><p className="font-jp text-aizome font-semibold mt-1">{example.answer}</p></div>)}</div>
    </section>}
  </div>;
}
