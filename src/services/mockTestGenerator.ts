import { ReadingTest, SpeakingQuestion } from '../types';
import { readingTests } from '../data/readingTests';
import { speakingQuestions } from '../data/speakingQuestions';

export type MockTestResult = {
  reading: ReadingTest;
  speaking: SpeakingQuestion[];
};

/**
 * Generates a mock speaking test adhering to class exam format:
 * - 1 random reading passage (approx 100-150 characters)
 * - 3 random speaking questions (prioritizing 2 image-based questions + 1 direct question)
 * - Guarantees no duplicate questions in the test
 * - Covers Lessons 1 to 3
 */
export function generateMockTest(): MockTestResult {
  if (readingTests.length === 0) {
    throw new Error('No reading tests available');
  }
  if (speakingQuestions.length < 3) {
    throw new Error('Not enough speaking questions available to generate test');
  }

  // 1. Random 1 reading test
  const readingIndex = Math.floor(Math.random() * readingTests.length);
  const reading = readingTests[readingIndex];

  // 2. Random 3 speaking questions (prefer 2 image + 1 direct)
  const imagePool = speakingQuestions.filter(q => q.type === 'image');
  const directPool = speakingQuestions.filter(q => q.type === 'direct');

  const shuffledImage = [...imagePool].sort(() => 0.5 - Math.random());
  const shuffledDirect = [...directPool].sort(() => 0.5 - Math.random());

  const selectedSpeaking: SpeakingQuestion[] = [];
  const selectedIds = new Set<string>();

  // Select 2 image questions
  for (const q of shuffledImage) {
    if (selectedSpeaking.length >= 2) break;
    if (!selectedIds.has(q.id)) {
      selectedSpeaking.push(q);
      selectedIds.add(q.id);
    }
  }

  // Select 1 direct question
  for (const q of shuffledDirect) {
    if (selectedSpeaking.length >= 3) break;
    if (!selectedIds.has(q.id)) {
      selectedSpeaking.push(q);
      selectedIds.add(q.id);
    }
  }

  // Fallback if needed
  if (selectedSpeaking.length < 3) {
    const allShuffled = [...speakingQuestions].sort(() => 0.5 - Math.random());
    for (const q of allShuffled) {
      if (selectedSpeaking.length >= 3) break;
      if (!selectedIds.has(q.id)) {
        selectedSpeaking.push(q);
        selectedIds.add(q.id);
      }
    }
  }

  return {
    reading,
    speaking: selectedSpeaking
  };
}

