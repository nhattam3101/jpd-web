export type GrammarPattern = {
  id: string;
  title: string;
  pattern: string;
  meaning: string;
  explanation: string;
  lesson: string; // '1' | '2' | '3'
  particles: string[];
  examples: {
    japanese: string;
    reading?: string;
    vietnamese: string;
  }[];
  commonMistakes?: string[];
  priority: 'high' | 'normal';
  examPriority?: boolean;
};

export type ParticleEntry = {
  id: string;
  particle: string;
  role: string;
  roleVi: string;
  pattern: string;
  examples: { japanese: string; reading?: string; vietnamese: string }[];
  compare?: { particle: string; example: string; vi: string }[];
  commonMistakes: string[];
  miniPractice: { blank: string; answer: string; full: string; vi: string }[];
  lessons: string[];
  examPriority?: boolean;
};

export type VerbEntry = {
  id: string;
  kana: string;
  kanji?: string;
  meaning: string;
  category: 'daily' | 'movement' | 'food' | 'study' | 'media' | 'shopping' | 'general';
  particles: string[];
  affirmative: string;
  negative: string;
  examples: { japanese: string; reading?: string; meaning: string }[];
  questionPatterns: { q: string; a: string; vi: string }[];
  lesson: string;
};

export type QuestionWordEntry = {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  category: string;
  pattern: string;
  exampleQ: string;
  exampleA: string;
  lesson: string;
  examPriority?: boolean;
};

export type ReactionQuestion = {
  id: string;
  mode: 'pattern-recognition' | 'particle-fill' | 'verb-choice' | 'build-sentence' | 'qa-reaction' | 'mixed';
  question: string;
  reading?: string;
  hint?: string;
  choices?: string[];
  correctAnswer: string;
  explanation: string;
  particle?: string;
  verb?: string;
  grammarId?: string;
  lesson: string;
  examPriority?: boolean;
};
