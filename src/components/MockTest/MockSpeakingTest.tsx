import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Timer, 
  Play, 
  ChevronRight, 
  Eye, 
  CheckCircle2, 
  RotateCcw
} from 'lucide-react';
import { generateMockTest, type MockTestResult, type TestLength, type TestPreset } from '../../services/mockTestGenerator';

interface MockSpeakingTestProps {
  onBackToHome: () => void;
}

type TestStep = 'intro' | 'reading' | 'questions' | 'completed';

export const MockSpeakingTest: React.FC<MockSpeakingTestProps> = ({ onBackToHome }) => {
  const [step, setStep] = useState<TestStep>('intro');
  const [length, setLength] = useState<TestLength>('quick');
  const [preset, setPreset] = useState<TestPreset>('mixed');
  const [test, setTest] = useState<MockTestResult | null>(null);
  
  // Timer state for Reading Part (120 seconds = 2 minutes)
  const [timerSeconds, setTimerSeconds] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [hasStartedReading, setHasStartedReading] = useState<boolean>(false);

  const testQuestions = test?.speaking ?? [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (step === 'reading' && isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, isTimerRunning, timerSeconds]);

  const activeReading = test?.reading;

  const handleStartReading = () => {
    setHasStartedReading(true);
    setIsTimerRunning(true);
  };

  const handleFinishReadingAndGoToQuestions = () => {
    setIsTimerRunning(false);
    setStep('questions');
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Record completed test
      try {
        const now = new Date();
        const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        localStorage.setItem('learning_jpd_last_test_date', dateStr);
      } catch (e) {
        console.error(e);
      }
      setStep('completed');
    }
  };

  const handleRestartTest = () => {
    setTimerSeconds(120);
    setIsTimerRunning(false);
    setHasStartedReading(false);
    setStep('intro');
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = testQuestions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-7 sm:py-12 flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-ink-pencil hover:text-ink px-3 py-2 rounded-xl border border-rule bg-paper-pure hover:border-aizome shadow-paper-sm transition-all cursor-pointer active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Trang chủ</span>
        </button>

        {/* Phase Pill */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-sage bg-mint-soft text-ink-pencil shadow-paper-sm">
            {step === 'intro' && 'Phòng thi vấn đáp'}
            {step === 'reading' && 'Phần 1: Đọc đoạn văn (2 phút)'}
            {step === 'questions' && `Phần 2: Câu hỏi ${currentQuestionIndex + 1} / ${testQuestions.length}`}
            {step === 'completed' && 'Hoàn thành bài thi'}
          </span>
        </div>
      </div>

      {/* STEP 1: INTRO */}
      {step === 'intro' && (
        <div className="exam-step study-panel w-full bg-paper-pure border border-sage rounded-2xl p-6 sm:p-10">
          <div className="mb-8">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-1">
              Bài thi thử kỹ năng nói
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-2">
              Kỳ thi vấn đáp Tiếng Nhật 1
            </h2>
            <p className="text-ink-pencil text-sm leading-relaxed max-w-xl">
              Quy trình mô phỏng chính xác cấu trúc bài kiểm tra nói trên lớp:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-mint-soft border border-sage">
              <span className="text-xs font-bold text-aizome block mb-1">
                PHẦN 1
              </span>
              <h3 className="text-sm font-bold text-ink mb-1">Đọc đoạn văn tiếng Nhật</h3>
              <p className="text-xs text-ink-pencil leading-relaxed">
                Đọc một đoạn văn khoảng 100–150 ký tự (Kanji đã học, ngày tháng, số, giờ). <strong>Thời gian làm bài: 2 phút</strong>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-aqua border border-mint">
              <span className="text-xs font-bold text-aizome block mb-1">
                PHẦN 2
              </span>
              <h3 className="text-sm font-bold text-ink mb-1">Xem tranh &amp; Trả lời câu hỏi</h3>
              <p className="text-xs text-ink-pencil leading-relaxed">
                Trả lời 3, 5 hoặc 8 câu hỏi trực tiếp và theo tranh, tùy thời lượng bạn chọn.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            <label className="text-sm font-medium text-ink-pencil">Thời lượng
              <select value={length} onChange={event => setLength(event.target.value as TestLength)} className="mt-2 w-full min-h-11 rounded-xl border border-rule bg-paper-pure px-3 text-ink">
                <option value="quick">Quick · 3 câu</option>
                <option value="standard">Standard · 5 câu</option>
                <option value="full">Full · 8 câu</option>
              </select>
            </label>
            <label className="text-sm font-medium text-ink-pencil">Phạm vi
              <select value={preset} onChange={event => setPreset(event.target.value as TestPreset)} className="mt-2 w-full min-h-11 rounded-xl border border-rule bg-paper-pure px-3 text-ink">
                <option value="mixed">Mixed Test</option>
                <option value="lesson1">Lesson 1 Test</option>
                <option value="lesson2">Lesson 2 Test</option>
                <option value="lesson3">Lesson 3 Test</option>
                <option value="priority">Exam Priority</option>
              </select>
            </label>
          </div>
          <p className="text-xs text-ink-pencil mb-6">Đề đọc và câu hỏi được chọn ngẫu nhiên. Full trong Mixed Test và Exam Priority trải đều các chủ đề chính.</p>

          <div className="flex justify-end pt-4 border-t border-rule">
            <button
              onClick={() => {
                let previous: { questionIds?: string[]; readingId?: string } = {};
                try {
                  previous = JSON.parse(localStorage.getItem('learning_jpd_last_mock') || '{}');
                } catch { /* Storage can be unavailable or contain invalid data. */ }
                const next = generateMockTest({ length, preset, previousQuestionIds: previous.questionIds, previousReadingId: previous.readingId });
                setTest(next);
                try {
                  localStorage.setItem('learning_jpd_last_mock', JSON.stringify({ questionIds: next.speaking.map(q => q.id), readingId: next.reading.id }));
                } catch { /* The test still works without persistent history. */ }
                setCurrentQuestionIndex(0);
                setShowAnswer(false);
                setStep('reading');
                setTimerSeconds(120);
                setHasStartedReading(false);
                setIsTimerRunning(false);
              }}
              className="interactive-lift w-full sm:w-auto px-7 py-3 bg-aizome hover:bg-aizome-hover text-white font-semibold text-sm rounded-xl shadow-paper flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Bắt đầu bài thi</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PART 1 - READING */}
      {step === 'reading' && activeReading && (
        <div className="exam-step study-panel w-full bg-paper-pure border border-sage rounded-2xl p-6 sm:p-12">
          {/* Header & Timer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-rule">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted block mb-0.5">
                PHẦN 1 &bull; ĐỌC ĐOẠN VĂN THÀNH TIẾNG
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-ink">{activeReading.title}</h2>
            </div>

            {/* Calm Timer Box */}
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-lg sm:text-xl font-bold tabular-nums transition-colors ${
              timerSeconds <= 20 
                ? 'bg-hanko-subtle border-hanko-border text-hanko' 
                : 'bg-paper-subtle border-rule text-ink'
            }`}>
              <Timer className="w-4 h-4 text-ink-pencil" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {/* Reading Passage Body */}
          <div className="my-8 sm:my-10">
            {!hasStartedReading ? (
              <div className="py-12 px-6 rounded-xl bg-aqua/70 border border-mint text-center">
                <p className="text-ink-light text-sm max-w-md mx-auto mb-5 leading-relaxed">
                  Khi bạn bấm <strong>"Bắt đầu đọc"</strong>, đồng hồ 2 phút sẽ bắt đầu tính giờ.<br />
                  Hãy đọc to, rõ ràng từng câu tiếng Nhật. Không hiển thị Romaji hay dịch nghĩa.
                </p>
                <button
                  onClick={handleStartReading}
                  className="interactive-lift px-6 py-2.5 bg-aizome hover:bg-aizome-hover text-white font-semibold text-sm rounded-xl shadow-paper inline-flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Bắt đầu đọc (Tính giờ)</span>
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-10 rounded-xl bg-aqua/40 border border-mint shadow-paper-sm">
                <div className="font-serif-jp text-lg sm:text-2xl leading-[2.2] tracking-wide text-ink whitespace-pre-line select-none">
                  {activeReading.text}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-rule">
            <span className="text-xs text-ink-muted">
              {hasStartedReading 
                ? (timerSeconds === 0 ? 'Hết giờ. Hãy chuyển sang Phần 2.' : 'Đang tính giờ. Đọc xong hãy bấm Tiếp tục.')
                : 'Đọc theo nhịp điệu tự nhiên, ngắt câu đúng dấu chấm.'}
            </span>

            <button
              onClick={handleFinishReadingAndGoToQuestions}
              className="px-5 py-2.5 bg-aizome hover:bg-aizome-hover text-white font-semibold text-xs sm:text-sm rounded-xl shadow-paper transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer ml-auto"
            >
              <span>Chuyển sang Phần 2: Vấn đáp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PART 2 - QUESTIONS / PICTURE */}
      {step === 'questions' && currentQ && (
        <div key={currentQuestionIndex} className="exam-step study-panel w-full bg-paper-pure border border-sage rounded-2xl p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-rule mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted block mb-0.5">
                PHẦN 2 &bull; VẤN ĐÁP
              </span>
              <span className="text-sm font-semibold text-ink">
                Câu hỏi {currentQuestionIndex + 1} / {testQuestions.length}
                {currentQ.type === 'image' ? ' (Theo tranh)' : ' (Trực tiếp)'}
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded text-xs font-medium border border-rule bg-paper-subtle text-ink-pencil">
              {currentQ.category || 'Môn Nhật 1'}
            </span>
          </div>

          {/* Visual Display for Image Questions */}
          {currentQ.type === 'image' && currentQ.visual && (
            <div className="mb-6 p-7 rounded-xl bg-aqua border border-mint flex flex-col items-center justify-center min-h-[140px] text-center">
              <div className="text-3xl sm:text-4xl tracking-widest whitespace-pre-line leading-relaxed text-ink select-none">
                {currentQ.visual.content}
              </div>
            </div>
          )}

          {/* Teacher Question */}
          <div className="text-center py-4 mb-6">
            <span className="text-xs font-medium text-ink-muted block mb-2">
              Giáo viên hỏi:
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink font-jp tracking-wide">
              {currentQ.question}
            </h2>
          </div>

          {/* Notice to speak aloud first */}
          <div className="text-center text-xs text-ink-pencil bg-mint-soft border border-sage p-3 rounded-xl mb-6 max-w-md mx-auto">
            Học viên tự phát âm câu trả lời thành tiếng trước khi bấm xem đáp án.
          </div>

          {/* Reveal Answer */}
          {!showAnswer ? (
            <div className="text-center mb-6">
              <button
                onClick={() => setShowAnswer(true)}
                className="px-5 py-2.5 bg-paper-pure hover:bg-paper-subtle border border-rule-strong text-ink text-xs sm:text-sm font-semibold rounded-xl shadow-paper-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-ink-pencil" />
                <span>Xem đáp án mẫu</span>
              </button>
            </div>
          ) : (
            <div className="reveal-answer mb-6 p-5 rounded-xl bg-matcha-subtle border border-matcha-border">
              <div className="text-xs font-bold uppercase tracking-wider text-matcha mb-2">
                Đáp án mẫu:
              </div>

              <div className="space-y-1 mb-2">
                {currentQ.expectedAnswers.map((ans, idx) => (
                  <div key={idx} className="text-base sm:text-lg font-bold text-ink font-jp">
                    {ans}
                  </div>
                ))}
              </div>

              {currentQ.vietnameseMeaning && (
                <div className="text-xs text-ink-pencil pt-2 border-t border-matcha-border">
                  <span className="font-medium text-ink">Nghĩa:</span> {currentQ.vietnameseMeaning}
                </div>
              )}
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-end pt-4 border-t border-rule">
            <button
              onClick={handleNextQuestion}
              className="px-5 py-2.5 bg-aizome hover:bg-aizome-hover text-white font-semibold text-xs sm:text-sm rounded-xl shadow-paper transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>{currentQuestionIndex < testQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả bài thi'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: COMPLETED */}
      {step === 'completed' && activeReading && (
        <div className="exam-step study-panel w-full bg-paper-pure border border-sage rounded-2xl p-7 sm:p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-matcha-subtle border border-matcha-border text-matcha flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 stroke-[2]" />
          </div>

          <h2 className="text-2xl font-bold text-ink mb-1">
            Hoàn thành bài thi thử!
          </h2>
          <p className="text-ink-pencil text-xs sm:text-sm max-w-md mx-auto mb-8">
            Bạn đã hoàn thành bài đọc đoạn văn tiếng Nhật và trả lời {testQuestions.length} câu hỏi vấn đáp.
          </p>

          {/* Summary Box */}
          <div className="bg-paper-subtle border border-rule rounded-xl p-5 max-w-lg mx-auto text-left mb-8 space-y-3">
            <div>
              <span className="text-xs text-ink-muted font-medium block mb-0.5">Phần 1 &bull; Đề đọc:</span>
              <p className="text-sm font-semibold text-ink">{activeReading.title}</p>
            </div>

            <div className="pt-3 border-t border-rule">
              <span className="text-xs text-ink-muted font-medium block mb-2">Phần 2 &bull; {testQuestions.length} câu hỏi đã trả lời:</span>
              <ul className="space-y-2 text-xs text-ink-light">
                {testQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-aizome font-bold">{idx + 1}.</span>
                    <div>
                      <strong className="text-ink font-jp">{q.question}</strong>
                      <p className="text-ink-pencil mt-0.5">&rarr; {q.expectedAnswers[0]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestartTest}
              className="px-5 py-2.5 bg-aizome hover:bg-aizome-hover text-white text-xs sm:text-sm font-semibold rounded-xl shadow-paper transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm đề thi khác</span>
            </button>

            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 bg-paper-pure hover:bg-paper-subtle border border-rule text-ink-pencil hover:text-ink text-xs sm:text-sm font-semibold rounded-xl shadow-paper-sm transition-colors cursor-pointer"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
