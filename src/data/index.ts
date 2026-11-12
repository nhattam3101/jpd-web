// ==========================================
// CENTRAL DATA & SERVICES EXPORT (Agent 2)
// ==========================================

// Vocabulary datasets & Decks
export * from './vocabulary';

// Reading Tests
export * from './readingTests';

// Speaking Questions
export * from './speakingQuestions';

// Mock Test Generator Service
export { generateMockTest, type MockTestResult } from '../services/mockTestGenerator';

// Types
export type {
  VocabularyCard,
  FlashCard,
  ReadingTest,
  SpeakingQuestion,
  CardProgressMap
} from '../types';

