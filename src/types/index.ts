export type VocabularyCard = {
  id: string;
  lesson: string;

  kanji?: string;
  kana: string;
  vietnamese: string;
  pronunciation: string;

  priority: "high" | "normal";

  // Compatibility helpers for Flashcard UI
  japanese?: string;
  frontText?: string;
};

export type FlashCard = {
  id: string;
  lesson: string;
  japanese: string;
  kana?: string;
  vietnamese: string;
  pronunciation: string;
  priority?: "high" | "normal";
  frontText: string;
};

export type ReadingTest = {
  id: string;
  title: string;
  lessons: string[];
  text: string;
  wordCount?: number;
  lessonRange?: string[];
};

export type SpeakingQuestion = {
  id: string;
  lesson: string;
  type: "image" | "direct";

  question: string;

  visual?: {
    kind: "emoji" | "text";
    content: string;
  };

  // Compatibility with existing UI
  image?: string;
  category?: string;

  expectedAnswers: string[];
  vietnameseMeaning: string;
};

export type CardProgressMap = Record<string, "known" | "unknown">;
