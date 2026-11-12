import { useState } from 'react';
import { BookOpen, Mic, Home as HomeIcon } from 'lucide-react';
import { Home } from './components/Home';
import { FlashcardPlayer } from './components/Flashcard/FlashcardPlayer';
import { MockSpeakingTest } from './components/MockTest/MockSpeakingTest';
import { QuestionRecognition } from './components/QuestionRecognition/QuestionRecognition';

type ViewMode = 'home' | 'flashcard' | 'mock-test' | 'recognition';

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
      <header className="border-b border-rule bg-paper-pure/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* NihonStep full logo */}
          <div 
            onClick={() => setCurrentView('home')}
            className="h-11 w-44 sm:w-48 flex items-center cursor-pointer select-none"
            role="button"
            tabIndex={0}
            aria-label="Về trang chủ"
          >
            <img src="/nihonstep-icon.png" alt="" className="h-9 w-9 object-contain shrink-0" />
            <span className="ml-2 text-lg font-bold tracking-tight">NihonStep</span>
          </div>

          {/* Minimal Nav Segment */}
          <nav className="flex items-center gap-1 bg-paper-subtle p-1 rounded-lg border border-rule">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
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
              className={`px-2.5 py-1 text-xs font-medium rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'flashcard'
                  ? 'bg-paper-pure text-ink shadow-paper-sm font-semibold'
                  : 'text-ink-pencil hover:text-ink'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Học từ vựng</span>
            </button>

            <button
              onClick={() => setCurrentView('mock-test')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'mock-test'
                  ? 'bg-paper-pure text-ink shadow-paper-sm font-semibold'
                  : 'text-ink-pencil hover:text-ink'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Thi thử</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Study Desk Area */}
      <main className="flex-1 w-full bg-paper">
        {currentView === 'home' && (
          <Home onSelectMode={handleSelectMode} />
        )}

        {currentView === 'flashcard' && (
          <FlashcardPlayer 
            initialDeckId={activeDeckId}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'recognition' && <QuestionRecognition onBackToHome={() => setCurrentView('home')} />}

        {currentView === 'mock-test' && (
          <MockSpeakingTest 
            onBackToHome={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-rule bg-paper-pure py-4 text-center text-xs text-ink-muted">
        NihonStep &bull; Không gian ôn tập Tiếng Nhật 1 &bull; Dữ liệu note iPad &bull; Hoàn toàn chạy offline
      </footer>
    </div>
  );
}

export default App;
