import React from 'react';
import { BookOpen, Mic, ArrowRight, CalendarClock, CheckCircle2, MessageCircleQuestion, Target } from 'lucide-react';
import { DECKS } from '../data/vocabulary';
import { readingTests } from '../data/readingTests';
import { speakingQuestions } from '../data/speakingQuestions';
import { loadProgress } from '../utils/storage';

interface HomeProps {
  onSelectMode: (mode: 'flashcard' | 'mock-test' | 'recognition', initialDeckId?: string) => void;
}


export const Home: React.FC<HomeProps> = ({ onSelectMode }) => {
  const progress = loadProgress();
  const allCards = DECKS.find(d => d.id === 'All')?.cards || [];
  const totalMastered = allCards.filter(c => progress[c.id] === 'known').length;
  const totalUnmastered = allCards.filter(c => progress[c.id] === 'unknown').length;
  const examCards = DECKS.find(d => d.id === 'Exam Priority')?.cards || [];
  const examMastered = examCards.filter(c => progress[c.id] === 'known').length;

  // Last mock test status stored in localStorage if any
  const lastTestDate = localStorage.getItem('learning_jpd_last_test_date');

  return (
    <div className="home-scene">
      <div className="home-japanese-background" aria-hidden="true">
        {['あ', '日', '本', '語', '学', '時', '月', '読', '話'].map((character, index) => (
          <span key={character} className={`home-japanese-character home-japanese-character-${index + 1}`}>
            {character}
          </span>
        ))}
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sage bg-paper-pure/80 text-ink-pencil text-xs font-semibold mb-5 shadow-paper-sm">
              <span className="w-2 h-2 rounded-full bg-aizome" />
              Môn Tiếng Nhật 1 · FPT University
            </div>
            <div className="flex flex-col sm:flex-row lg:justify-start justify-center items-center gap-4 mb-4">
              <span className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-mint-soft border border-sage flex items-center justify-center shadow-paper rotate-[-2deg]">
                <img src="/nihonstep-icon.png" alt="" className="h-24 w-24 sm:h-28 sm:w-28 object-contain" />
              </span>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-ink">NihonStep</h1>
                <p className="mt-1 font-serif-jp text-lg text-aizome tracking-[0.12em]">日本語を、一歩ずつ。</p>
              </div>
            </div>
            <p className="text-ink-pencil text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Học từ vựng theo từng bài, luyện phản xạ câu hỏi và mô phỏng phòng thi nói trong một không gian tập trung, nhẹ nhàng.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3" aria-label="Tiến độ học tập">
            <div className="col-span-2 rounded-2xl bg-aizome text-white p-5 shadow-paper-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-white text-xs font-medium">Tiến độ từ vựng</span>
                  <div className="mt-1 text-2xl font-bold tabular-nums">{totalMastered} <span className="text-base font-medium text-white">/ {allCards.length} từ</span></div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-mint" />
              </div>
              <div className="mt-4 h-2 rounded-full bg-paper-pure/20 overflow-hidden">
                <div className="h-full rounded-full bg-mint transition-[width] duration-500" style={{ width: `${allCards.length ? (totalMastered / allCards.length) * 100 : 0}%` }} />
              </div>
            </div>
            <div className="rounded-2xl bg-mint-soft border border-sage p-4">
              <Target className="w-5 h-5 text-aizome mb-3" />
              <div className="text-xl font-bold tabular-nums">{totalUnmastered}</div>
              <div className="text-xs text-ink-pencil mt-0.5">từ cần ôn</div>
            </div>
            <div className="rounded-2xl bg-aqua border border-mint p-4">
              <CalendarClock className="w-5 h-5 text-aizome mb-3" />
              <div className="text-sm font-bold leading-snug">{lastTestDate || 'Chưa thi'}</div>
              <div className="text-xs text-ink-pencil mt-0.5">lần thi gần nhất</div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-6">
          <button onClick={() => onSelectMode('flashcard')} className="interactive-lift group relative flex flex-col justify-between min-h-64 p-7 sm:p-8 rounded-2xl bg-paper-pure border border-sage text-left cursor-pointer overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-mint-soft transition-transform duration-500 group-hover:scale-125" />
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <span className="w-12 h-12 rounded-xl bg-aizome flex items-center justify-center text-white shadow-paper"><BookOpen className="w-6 h-6 stroke-[1.8]" /></span>
                <span className="text-xs font-semibold text-aizome bg-mint-soft px-2.5 py-1 rounded-md">{allCards.length} từ</span>
              </div>
              <h2 className="text-2xl font-bold text-ink mb-2">Học từ vựng</h2>
              <p className="text-ink-pencil text-sm leading-relaxed">Flashcard theo Bài 1.1 → 3.3, lọc từ chưa thuộc và lưu tiến độ ngay trên máy.</p>
            </div>
            <div className="relative mt-7 pt-4 border-t border-rule flex items-center justify-between text-xs">
              <span className="text-ink-pencil">Ưu tiên thi <strong className="text-ink">{examMastered}/{examCards.length}</strong></span>
              <span className="font-bold text-aizome flex items-center gap-1.5">Vào học <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </button>

          <button onClick={() => onSelectMode('mock-test')} className="interactive-lift group relative flex flex-col justify-between min-h-64 p-7 sm:p-8 rounded-2xl bg-aqua border border-mint text-left cursor-pointer overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-paper-pure/60 transition-transform duration-500 group-hover:scale-125" />
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <span className="w-12 h-12 rounded-xl bg-ink flex items-center justify-center text-aqua shadow-paper"><Mic className="w-6 h-6 stroke-[1.8]" /></span>
                <span className="text-xs font-semibold text-aizome bg-paper-pure/75 px-2.5 py-1 rounded-md">2 phút / đề</span>
              </div>
              <h2 className="text-2xl font-bold text-ink mb-2">Thi thử vấn đáp</h2>
              <p className="text-ink-pencil text-sm leading-relaxed">Đọc đoạn văn có tính giờ, trả lời câu hỏi và kiểm tra đáp án mẫu theo đúng nhịp phòng thi.</p>
            </div>
            <div className="relative mt-7 pt-4 border-t border-mint flex items-center justify-between text-xs">
              <span className="text-ink-pencil">{readingTests.length} đề · {speakingQuestions.length} câu hỏi</span>
              <span className="font-bold text-aizome flex items-center gap-1.5">Bắt đầu <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </button>
        </section>

        <button onClick={() => onSelectMode('recognition')} className="interactive-lift group w-full text-left mb-10 p-5 sm:p-6 rounded-2xl bg-sage text-ink flex items-center gap-4 border border-aizome/20">
          <span className="w-11 h-11 rounded-xl bg-paper-pure/75 flex items-center justify-center shrink-0"><MessageCircleQuestion className="w-5 h-5 text-aizome" /></span>
          <span className="flex-1"><strong className="block text-base sm:text-lg">Nhận diện câu hỏi</strong><span className="block mt-1 text-xs sm:text-sm text-ink-light">Luyện từ hỏi, ý nghĩa và cấu trúc trả lời theo từng nhóm.</span></span>
          <ArrowRight className="w-5 h-5 text-aizome transition-transform group-hover:translate-x-1" />
        </button>

        <section className="w-full rounded-2xl bg-paper-pure/70 border border-rule p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div><h2 className="font-bold text-ink">Vào nhanh bài học</h2><p className="text-xs text-ink-muted mt-1">Chọn một bộ thẻ để bắt đầu ngay</p></div>
            <span className="hidden sm:block text-xs text-ink-muted">{DECKS.length} bộ thẻ</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
          {DECKS.map(deck => {
            const isExam = deck.id === 'Exam Priority';
            return (
              <button
                key={deck.id}
                onClick={() => onSelectMode('flashcard', deck.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  isExam
                    ? 'bg-hanko-subtle border-hanko-border text-hanko hover:bg-hanko hover:text-white'
                    : 'bg-mint-soft border-sage text-ink-light hover:bg-aizome hover:border-aizome hover:text-white'
                }`}
              >
                {deck.label} <span className={`font-normal text-[11px] ${isExam ? 'text-hanko' : 'text-ink-muted'}`}>({deck.cards.length})</span>
              </button>
            );
          })}
          </div>
        </section>
      </div>
    </div>
  );
};
