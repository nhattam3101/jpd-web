import React from 'react';
import { BookOpen, Mic, ArrowRight } from 'lucide-react';
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
    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center">
      {/* Editorial Title / Header */}
      <div className="w-full text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-rule bg-paper-subtle text-ink-pencil text-xs font-medium tracking-wide mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-aizome"></span>
          <span>Môn Tiếng Nhật 1 &bull; FPT University</span>
        </div>
        <h1 className="mx-auto mb-3 flex items-center justify-center gap-3 h-24 sm:h-28">
          <img src="/nihonstep-icon.png" alt="" className="h-20 w-20 sm:h-24 sm:w-24 object-contain" />
          <span className="text-4xl font-bold tracking-tight">NihonStep</span>
        </h1>
        <p className="text-ink-pencil text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Không gian ôn tập tối giản: thẻ học theo note iPad Bài 1.1 → 3.3 và bài thi nói mô phỏng phòng thi.
        </p>

        {/* Quiet Study Footprint */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span className="text-ink font-semibold">{totalMastered}</span> / {allCards.length} từ đã thuộc
          </span>
          <span className="text-rule-strong">&bull;</span>
          <span className="flex items-center gap-1.5">
            <span className="text-hanko font-medium">{totalUnmastered}</span> từ cần ôn lại
          </span>
          <span className="text-rule-strong">&bull;</span>
          <span>
            {lastTestDate ? `Lần thi gần nhất: ${lastTestDate}` : 'Chưa thi thử'}
          </span>
        </div>
      </div>

      {/* Two Primary Actions (The Core Focal Point) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-14">
        {/* Action 1: Học từ vựng */}
        <button
          onClick={() => onSelectMode('flashcard')}
          className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-paper-pure border border-rule hover:border-ink-muted shadow-paper hover:shadow-paper-lg transition-all duration-200 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aizome"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="w-10 h-10 rounded-xl bg-paper-subtle border border-rule flex items-center justify-center text-aizome group-hover:bg-aizome group-hover:text-paper-pure transition-colors duration-200">
                <BookOpen className="w-5 h-5 stroke-[1.75]" />
              </span>
              <span className="text-xs font-medium text-ink-muted group-hover:text-ink transition-colors">
                356 từ vựng
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">
              Học từ vựng
            </h2>
            <p className="text-ink-pencil text-xs sm:text-sm leading-relaxed mb-6">
              Flashcard Bài 1.1 → 3.3 và 192 từ Exam Priority. Lật thẻ, lọc từ chưa thuộc, lưu tiến độ tự động trên máy.
            </p>
          </div>

          <div className="pt-4 border-t border-rule flex items-center justify-between text-xs">
            <span className="text-ink-pencil font-medium">
              Ưu tiên thi: <strong className="text-ink">{examMastered}</strong> / {examCards.length}
            </span>
            <span className="font-semibold text-aizome flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Vào học <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>

        {/* Action 2: Thi thử */}
        <button
          onClick={() => onSelectMode('mock-test')}
          className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-paper-pure border border-rule hover:border-ink-muted shadow-paper hover:shadow-paper-lg transition-all duration-200 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aizome"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="w-10 h-10 rounded-xl bg-paper-subtle border border-rule flex items-center justify-center text-aizome group-hover:bg-aizome group-hover:text-paper-pure transition-colors duration-200">
                <Mic className="w-5 h-5 stroke-[1.75]" />
              </span>
              <span className="text-xs font-medium text-ink-muted group-hover:text-ink transition-colors">
                2 phút / đề
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-2">
              Thi thử
            </h2>
            <p className="text-ink-pencil text-xs sm:text-sm leading-relaxed mb-6">
              Mô phỏng bài thi nói thật: đọc đoạn văn tiếng Nhật khoảng 100–150 ký tự (có timer 2 phút) và trả lời 3, 5 hoặc 8 câu hỏi.
            </p>
          </div>

          <div className="pt-4 border-t border-rule flex items-center justify-between text-xs">
            <span className="text-ink-pencil font-medium">
              {readingTests.length} đề đọc &bull; {speakingQuestions.length} câu hỏi
            </span>
            <span className="font-semibold text-aizome flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Bắt đầu <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>
      </div>

      <button onClick={() => onSelectMode('recognition')} className="w-full text-left mb-10 p-6 rounded-2xl border border-rule bg-paper-pure hover:border-aizome shadow-paper">
        <span className="block text-lg font-bold text-ink">Nhận diện câu hỏi →</span>
        <span className="block mt-2 text-sm text-ink-pencil">Luyện từ hỏi, ý nghĩa và cấu trúc trả lời; ôn lại các dạng câu theo từng nhóm.</span>
      </button>

      {/* Subtle Lesson Quick-Switch */}
      <div className="w-full pt-8 border-t border-rule">
        <div className="flex items-center justify-between mb-3 text-xs text-ink-muted">
          <span className="font-medium tracking-wide">Các bài học trong giáo trình:</span>
          <span>Chọn để vào nhanh</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DECKS.map(deck => {
            const isExam = deck.id === 'Exam Priority';
            return (
              <button
                key={deck.id}
                onClick={() => onSelectMode('flashcard', deck.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  isExam
                    ? 'bg-hanko-subtle border-hanko-border text-hanko hover:border-hanko'
                    : 'bg-paper-pure border-rule text-ink-light hover:border-rule-strong hover:text-ink shadow-paper-sm'
                }`}
              >
                {deck.label} <span className={`font-normal text-[11px] ${isExam ? 'text-hanko' : 'text-ink-muted'}`}>({deck.cards.length})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
};
