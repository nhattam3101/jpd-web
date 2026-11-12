import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Check, 
  X, 
  RotateCcw, 
  Filter,
  ArrowLeft,
  RotateCw
} from 'lucide-react';
import { FlashCard } from '../../types';
import { DECKS } from '../../data/vocabulary';
import { loadProgress, updateCardStatus, resetCardsProgress } from '../../utils/storage';

interface FlashcardPlayerProps {
  initialDeckId?: string;
  onBackToHome: () => void;
}

export const FlashcardPlayer: React.FC<FlashcardPlayerProps> = ({ 
  initialDeckId = 'All', 
  onBackToHome 
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>(initialDeckId);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progressMap, setProgressMap] = useState<Record<string, 'known' | 'unknown'>>(() => loadProgress());
  const [onlyUnknownMode, setOnlyUnknownMode] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  // Active base deck cards
  const rawCards = useMemo(() => {
    const deck = DECKS.find(d => d.id === selectedDeckId) || DECKS[0];
    return deck.cards;
  }, [selectedDeckId]);

  // Filtered / Shuffled cards
  const activeCards = useMemo(() => {
    let list = [...rawCards];

    if (onlyUnknownMode) {
      list = list.filter(c => progressMap[c.id] === 'unknown' || !progressMap[c.id]);
    }

    if (isShuffled) {
      list.sort(() => 0.5 - Math.random());
    }

    return list;
  }, [rawCards, onlyUnknownMode, isShuffled, progressMap]);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= activeCards.length) {
      setCurrentIndex(Math.max(0, activeCards.length - 1));
    }
    setIsFlipped(false);
  }, [activeCards.length, currentIndex]);

  const currentCard: FlashCard | undefined = activeCards[currentIndex];

  const handleNext = useCallback(() => {
    if (activeCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % activeCards.length);
  }, [activeCards.length]);

  const handlePrev = useCallback(() => {
    if (activeCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + activeCards.length) % activeCards.length);
  }, [activeCards.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleMark = useCallback((status: 'known' | 'unknown') => {
    if (!currentCard) return;
    const updated = updateCardStatus(currentCard.id, status);
    setProgressMap(updated);
    handleNext();
  }, [currentCard, handleNext]);

  const handleShuffle = () => {
    setIsShuffled(prev => !prev);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleResetProgress = () => {
    if (window.confirm('Đặt lại toàn bộ tiến độ đánh dấu cho bộ thẻ này?')) {
      const ids = rawCards.map(c => c.id);
      const updated = resetCardsProgress(ids);
      setProgressMap(updated);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        e.preventDefault();
        handleMark('unknown');
      } else if (e.key === '2') {
        e.preventDefault();
        handleMark('known');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleMark]);

  // Helper to split Kanji and Kana for editorial typography
  const parseJapaneseParts = (japanese: string) => {
    const match = japanese.match(/^(.+?)[（\(]([^）\)]+)[）\)](.*)$/);
    if (match) {
      return {
        kanji: match[1].trim() + (match[3] ? match[3].trim() : ''),
        kana: match[2].trim()
      };
    }
    return {
      kanji: japanese.trim(),
      kana: null
    };
  };

  const cardParts = currentCard ? parseJapaneseParts(currentCard.japanese) : null;
  const isMastered = currentCard && progressMap[currentCard.id] === 'known';
  const isMarkedUnknown = currentCard && progressMap[currentCard.id] === 'unknown';

  const deckKnownCount = rawCards.filter(c => progressMap[c.id] === 'known').length;
  const deckUnknownCount = rawCards.filter(c => progressMap[c.id] === 'unknown').length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-7 sm:py-12 flex flex-col items-center">
      {/* Minimal Top Control Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-ink-pencil hover:text-ink px-3 py-2 rounded-xl border border-rule bg-paper-pure hover:border-aizome shadow-paper-sm transition-all cursor-pointer active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Trang chủ</span>
        </button>

        {/* Deck Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDeckId}
            onChange={(e) => {
              setSelectedDeckId(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="min-h-10 bg-paper-pure border border-rule text-ink text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 shadow-paper-sm cursor-pointer"
          >
            {DECKS.map(deck => (
              <option key={deck.id} value={deck.id}>
                {deck.label} ({deck.cards.length} từ)
              </option>
            ))}
          </select>
        </div>

        {/* Tool Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setOnlyUnknownMode(!onlyUnknownMode)}
            className={`min-h-10 px-3 py-2 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer active:scale-[0.98] ${
              onlyUnknownMode
                ? 'bg-hanko-subtle border-hanko-border text-hanko'
                : 'bg-paper-pure border-rule text-ink-pencil hover:text-ink shadow-paper-sm'
            }`}
            title="Chỉ hiển thị các từ chưa thuộc"
          >
            <Filter className="w-3 h-3" />
            <span>Chưa thuộc ({rawCards.length - deckKnownCount})</span>
          </button>

          <button
            onClick={handleShuffle}
            className={`w-10 h-10 text-xs rounded-xl border transition-all cursor-pointer inline-flex items-center justify-center active:scale-95 ${
              isShuffled
                ? 'bg-aizome text-white border-aizome'
                : 'bg-paper-pure border-rule text-ink-pencil hover:text-ink shadow-paper-sm'
            }`}
            title="Xáo trộn ngẫu nhiên"
            aria-label="Xáo trộn thẻ"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetProgress}
            className="w-10 h-10 text-xs rounded-xl border bg-paper-pure border-rule text-ink-pencil hover:text-ink hover:border-aizome shadow-paper-sm transition-all cursor-pointer inline-flex items-center justify-center active:scale-95"
            title="Đặt lại tiến độ bộ thẻ này"
            aria-label="Đặt lại tiến độ"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Counter */}
      <div className="w-full max-w-xl flex items-center justify-between text-xs text-ink-muted mb-2 px-1">
        <span className="font-mono">
          <strong className="text-ink font-semibold">{activeCards.length > 0 ? currentIndex + 1 : 0}</strong> / {activeCards.length}
        </span>
        <div className="flex items-center gap-3 font-medium">
          <span className="text-matcha">✓ Thuộc: {deckKnownCount}</span>
          <span className="text-hanko">✗ Chưa: {deckUnknownCount}</span>
        </div>
      </div>

      {/* Subtle Progress Bar */}
      <div className="w-full max-w-xl bg-paper-dark h-1 rounded-full overflow-hidden mb-6">
        <div 
          className="bg-aizome h-full transition-all duration-200 rounded-full"
          style={{ width: `${activeCards.length > 0 ? ((currentIndex + 1) / activeCards.length) * 100 : 0}%` }}
        />
      </div>

      {/* THE MAIN CARD ARENA */}
      {activeCards.length === 0 ? (
        <div className="study-panel w-full max-w-xl h-80 sm:h-96 rounded-2xl bg-paper-pure border border-rule flex flex-col items-center justify-center p-8 text-center">
          <Check className="w-10 h-10 text-matcha mb-3 stroke-[2]" />
          <h3 className="text-lg font-bold text-ink mb-1">Đã thuộc toàn bộ từ vựng!</h3>
          <p className="text-xs text-ink-pencil mb-5">Không còn từ nào trong danh sách "Chưa thuộc".</p>
          <button
            onClick={() => setOnlyUnknownMode(false)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-aizome text-white hover:bg-aizome-hover transition-colors cursor-pointer"
          >
            Ôn tập lại toàn bộ thẻ
          </button>
        </div>
      ) : (
        <div
          key={currentCard?.id}
          className="flashcard-stage flashcard-swap w-full max-w-xl h-80 sm:h-96 cursor-pointer select-none"
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? 'Quay lại mặt trước của thẻ' : 'Lật thẻ để xem cách đọc'}
          aria-pressed={isFlipped}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              event.stopPropagation();
              handleFlip();
            }
          }}
        >
          <div
            className={`flashcard-flipper relative w-full h-full transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT FACE (Japanese Editorial Study Card) */}
            <div className="flashcard-face flashcard-front study-panel absolute w-full h-full backface-hidden bg-paper-pure border border-rule hover:border-rule-strong rounded-2xl p-7 sm:p-9 flex flex-col justify-between transition-[border-color,box-shadow] duration-300">
              {/* Header inside card */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-ink-muted font-medium">
                  {currentCard?.lesson}
                </span>

                <div className="flex items-center gap-1.5">
                  {currentCard?.priority === 'high' && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-hanko-subtle border border-hanko-border text-hanko">
                      Ưu tiên thi
                    </span>
                  )}
                  {isMastered && (
                    <span className="text-matcha text-xs font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Thuộc
                    </span>
                  )}
                  {isMarkedUnknown && !isMastered && (
                    <span className="text-hanko text-xs font-medium flex items-center gap-1">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" /> Chưa
                    </span>
                  )}
                </div>
              </div>

              {/* Main Content: Japanese Typography Centerpiece */}
              <div className="text-center my-auto px-4">
                {/* Kanji / Main Script */}
                <div className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide text-ink font-jp mb-1.5 leading-tight">
                  {cardParts?.kanji}
                </div>

                {/* Furigana / Reading */}
                {cardParts?.kana && (
                  <div className="text-base sm:text-lg font-medium text-ink-pencil font-jp mb-6">
                    {cardParts.kana}
                  </div>
                )}

                {/* Subtle Divider Rule */}
                <div className="w-12 h-px bg-rule mx-auto my-4" />

                {/* Vietnamese Meaning */}
                <div className="text-lg sm:text-xl font-medium text-ink-light">
                  {currentCard?.vietnamese}
                </div>
              </div>

              {/* Footer Hint */}
              <div className="text-center text-[11px] text-ink-muted flex items-center justify-center gap-1.5">
                <RotateCw className="w-3 h-3 text-ink-faint" />
                <span>Bấm thẻ hoặc phím Space để xem cách đọc</span>
              </div>
            </div>

            {/* BACK FACE (Pronunciation according to Note) */}
            <div className="flashcard-face flashcard-back study-panel absolute w-full h-full backface-hidden rounded-2xl p-7 sm:p-9 flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs text-ink-muted">
                <span className="font-medium tracking-wide">CÁCH ĐỌC (NOTE IPAD)</span>
                <span>{currentCard?.lesson}</span>
              </div>

              <div className="text-center my-auto px-2 sm:px-4">
                <span className="text-xs font-semibold text-ink-muted block mb-2">PHIÊN ÂM KIỂU TIẾNG VIỆT</span>
                <div className="text-3xl sm:text-4xl font-bold tracking-wide text-aizome font-sans">
                  {currentCard?.pronunciation}
                </div>

                <div className="w-14 h-1 rounded-full bg-rule-strong mx-auto my-5" />

                <div>
                  <span className="text-xs font-semibold text-ink-muted block mb-1.5">NGHĨA TIẾNG VIỆT</span>
                  <div className="text-xl sm:text-2xl font-bold text-ink">
                    {currentCard?.vietnamese}
                  </div>
                  <div className="mt-3 text-sm text-ink-pencil font-jp">
                    {currentCard?.japanese}
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] text-ink-muted flex items-center justify-center gap-1.5">
                <RotateCw className="w-3 h-3 text-ink-faint" />
                <span>Phím Space để quay lại mặt trước</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Control Actions (Clean, Calm, High Contrast) */}
      <div className="grid grid-cols-[44px_1fr_1fr_44px] items-center gap-2 sm:gap-4 mt-7 sm:mt-8 w-full max-w-xl">
        {/* Previous */}
        <button
          onClick={handlePrev}
          disabled={activeCards.length <= 1}
          className="p-3 w-11 h-11 rounded-xl bg-paper-pure hover:bg-paper-subtle border border-rule hover:border-rule-strong text-ink-pencil hover:text-ink transition-all flex items-center justify-center shadow-paper-sm active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Thẻ trước (←)"
          aria-label="Thẻ trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Mark Unknown */}
        <button
          onClick={() => handleMark('unknown')}
          disabled={!currentCard}
          className="min-h-11 px-2 sm:px-5 py-2.5 rounded-xl bg-paper-pure hover:bg-hanko-subtle border border-hanko-border hover:border-hanko text-hanko text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 shadow-paper-sm cursor-pointer"
          title="Đánh dấu chưa thuộc (Phím 1)"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
          <span>Chưa thuộc</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-paper-subtle rounded border border-hanko-border text-hanko font-mono">1</kbd>
        </button>

        {/* Mark Known */}
        <button
          onClick={() => handleMark('known')}
          disabled={!currentCard}
          className="min-h-11 px-2 sm:px-5 py-2.5 rounded-xl bg-matcha-subtle hover:bg-matcha hover:text-white border border-matcha-border hover:border-matcha text-matcha text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95 shadow-paper-sm cursor-pointer"
          title="Đánh dấu đã thuộc (Phím 2)"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Đã thuộc</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-paper-subtle rounded border border-matcha-border text-matcha font-mono">2</kbd>
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={activeCards.length <= 1}
          className="p-3 w-11 h-11 rounded-xl bg-paper-pure hover:bg-paper-subtle border border-rule hover:border-rule-strong text-ink-pencil hover:text-ink transition-all flex items-center justify-center shadow-paper-sm active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Thẻ kế (→)"
          aria-label="Thẻ kế"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard Legend */}
      <div className="mt-8 text-center text-[11px] text-ink-muted flex flex-wrap items-center justify-center gap-3">
        <span><kbd className="px-1.5 py-0.5 bg-paper-subtle border border-rule rounded text-ink-pencil font-mono">Space</kbd> Lật thẻ</span>
        <span><kbd className="px-1.5 py-0.5 bg-paper-subtle border border-rule rounded text-ink-pencil font-mono">&larr;</kbd> <kbd className="px-1.5 py-0.5 bg-paper-subtle border border-rule rounded text-ink-pencil font-mono">&rarr;</kbd> Chuyển thẻ</span>
        <span><kbd className="px-1.5 py-0.5 bg-paper-subtle border border-rule rounded text-ink-pencil font-mono">1</kbd> Chưa thuộc</span>
        <span><kbd className="px-1.5 py-0.5 bg-paper-subtle border border-rule rounded text-ink-pencil font-mono">2</kbd> Đã thuộc</span>
      </div>
    </div>
  );
};
