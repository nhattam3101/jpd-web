import { useState } from 'react';
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
  return <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
    <button onClick={onBackToHome} className="text-sm text-aizome mb-6">← Trang chủ</button>
    <h1 className="text-2xl font-bold mb-2">Nhận diện câu hỏi</h1>
    <p className="text-sm text-ink-pencil mb-6">Nhìn câu hỏi, nhận ra từ hỏi và chọn ý nghĩa trước khi xem cách trả lời.</p>
    <div className="flex gap-2 mb-6" aria-label="Chế độ ôn tập">
      <button onClick={() => setView('practice')} className={`px-4 py-2 rounded-lg border ${view === 'practice' ? 'bg-aizome text-white' : 'border-rule'}`}>Luyện tập</button>
      <button onClick={() => setView('words')} className={`px-4 py-2 rounded-lg border ${view === 'words' ? 'bg-aizome text-white' : 'border-rule'}`}>Ôn từ hỏi</button>
    </div>
    {view === 'practice' ? <section className="bg-paper-pure border border-rule rounded-2xl p-6 sm:p-8">
      {current.example.visual && <p className="text-center text-ink-pencil mb-3">{current.example.visual}</p>}
      <p className="font-jp text-center text-2xl sm:text-3xl py-5">{current.example.question}</p>
      <p className="font-semibold text-sm mb-3">Đang hỏi gì?</p>
      <div className="grid sm:grid-cols-2 gap-2">{ordered.map(p => <button key={p.id} onClick={() => setAnswer(p.category)} disabled={answer !== null} className="text-left border border-rule rounded-lg p-3 hover:border-aizome disabled:cursor-default">{p.category}</button>)}</div>
      {answer !== null && <div role="status" className="mt-5 p-4 bg-matcha-subtle border border-matcha-border rounded-xl space-y-2 text-sm">
        <p className="font-bold">{answer === current.pattern.category ? 'Chính xác!' : `Đáp án: ${current.pattern.category}`}</p>
        <p><strong>{current.pattern.questionWord}</strong> — {current.pattern.meaning}</p>
        <p>Kiểu trả lời: {current.pattern.answerPattern}</p><p>Ví dụ: <span className="font-jp font-bold">{current.example.answer}</span></p>
      </div>}
      <button onClick={next} className="mt-6 px-5 py-3 bg-aizome text-white rounded-xl">Câu tiếp theo</button>
    </section> : <section className="bg-paper-pure border border-rule rounded-2xl p-6 sm:p-8">
      <label className="block text-sm font-medium">Từ hỏi / dạng câu
        <select value={word} onChange={e => setWord(e.target.value)} className="mt-2 w-full border border-rule rounded-lg p-3 bg-paper-pure">{questionPatterns.map(p => <option value={p.id} key={p.id}>{p.questionWord} — {p.category}</option>)}</select>
      </label>
      <h2 className="font-jp text-xl font-bold mt-6">{selected.pattern}</h2>
      <p className="mt-2 text-sm">{selected.questionWord} — {selected.meaning}</p>
      <p className="mt-2 text-sm">Kiểu trả lời: <strong>{selected.answerPattern}</strong></p>
      <div className="mt-5 space-y-3">{selected.examples.filter(example => !example.seed).slice(0, 8).map((example,i) => <div key={i} className="border-t border-rule pt-3 text-sm"><p>{example.visual}</p><p className="font-jp">{example.question}</p><p className="font-jp text-aizome">{example.answer}</p></div>)}</div>
    </section>}
  </div>;
}
