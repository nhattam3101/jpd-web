import { useState } from 'react';
import { BookOpen, Mic, Home as HomeIcon } from 'lucide-react';
import { Home } from './components/Home';
import { FlashcardPlayer } from './components/Flashcard/FlashcardPlayer';
import { MockSpeakingTest } from './components/MockTest/MockSpeakingTest';
import { KanjiStudy } from './components/Kanji/KanjiStudy';
import { QuestionRecognition } from './components/QuestionRecognition/QuestionRecognition';

type ViewMode = 'home' | 'flashcard' | 'mock-test' | 'recognition' | 'kanji';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [activeDeckId, setActiveDeckId] = useState<string>('All');

  const handleSelectMode = (mode: 'flashcard' | 'mock-test' | 'recognition', initialDeckId?: string) => {
    if (initialDeckId) {
      setActiveDeckId(initialDeckId);
    }
    setCurrentView(mode);
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans">
      {/* Top Stationery Navbar */}
      <header className="border-b border-rule/80 bg-paper-pure/85 backdrop-blur-md sticky top-0 z-50 shadow-paper-sm">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* NihonStep full logo */}
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="h-11 flex items-center cursor-pointer select-none rounded-xl px-1.5 -ml-1.5 group"
            aria-label="Về trang chủ"
          >
            <span className="h-10 w-10 rounded-xl bg-mint-soft flex items-center justify-center border border-sage/70 group-hover:bg-mint transition-colors">
              <img src="/nihonstep-icon.png" alt="" className="h-9 w-9 object-contain shrink-0" />
            </span>
            <span className="ml-2.5 text-lg font-bold tracking-[-0.025em] hidden xs:block sm:block">NihonStep</span>
          </button>

          {/* Minimal Nav Segment */}
          <nav className="flex items-center gap-1 bg-paper-subtle/90 p-1 rounded-xl border border-rule" aria-label="Điều hướng chính">
            <button
              onClick={() => setCurrentView('home')}
              className={`min-h-9 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'home'
                  ? 'bg-paper-pure text-ink shadow-paper-sm font-semibold'
                  : 'text-ink-pencil hover:text-ink'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trang chủ</span>
            </button>

            <button
              onClick={() => setCurrentView('flashcard')}
              className={`min-h-9 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'flashcard'
                  ? 'bg-paper-pure text-ink shadow-paper-sm font-semibold'
                  : 'text-ink-pencil hover:text-ink'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Học từ vựng</span>
              <span className="sm:hidden">Từ vựng</span>
            </button>

            <button onClick={() => setCurrentView('kanji')} className={`min-h-9 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg ${currentView === 'kanji' ? 'bg-paper-pure text-ink shadow-paper-sm' : 'text-ink-pencil'}`}>Học Kanji</button>

            <button
              onClick={() => setCurrentView('mock-test')}
              className={`min-h-9 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'mock-test'
                  ? 'bg-paper-pure text-ink shadow-paper-sm font-semibold'
                  : 'text-ink-pencil hover:text-ink'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Thi thử</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Study Desk Area */}
      <main className="app-surface flex-1 w-full">
        <div key={currentView} className="app-view">
          {currentView === 'home' && (
            <Home onSelectMode={handleSelectMode} />
          )}

          {currentView === 'flashcard' && (
            <FlashcardPlayer
              initialDeckId={activeDeckId}
              onBackToHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'kanji' && <KanjiStudy />}

          {currentView === 'recognition' && <QuestionRecognition onBackToHome={() => setCurrentView('home')} />}

          {currentView === 'mock-test' && (
            <MockSpeakingTest
              onBackToHome={() => setCurrentView('home')}
            />
          )}
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-rule bg-aizome text-white py-5 px-4 text-center text-xs">
        NihonStep &bull; Không gian ôn tập Tiếng Nhật 1 &bull; Dữ liệu note iPad &bull; Hoàn toàn chạy offline
      </footer>
    </div>
  );
}

export default App;
