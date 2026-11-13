import type { ReadingTest, SpeakingQuestion } from '../types';
import { readingTests } from '../data/readingTests';
import { speakingQuestions } from '../data/speakingQuestions';

export type TestLength = 'quick' | 'standard' | 'full';
export type TestPreset = 'lesson1' | 'lesson2' | 'lesson3' | 'mixed' | 'priority';
export type MockTestResult = { reading: ReadingTest; speaking: SpeakingQuestion[] };
export type GeneratorOptions = { length?: TestLength; preset?: TestPreset; previousQuestionIds?: string[]; previousReadingId?: string; random?: () => number };
export const mockExamFormat = { pictureQuestions: 3, directQuestions: 1 } as const;
export type ReadingCriterion = { id: string; label: string; points: number };
export type ReadingRubric = { total: 40; criteria: ReadingCriterion[] };
export const scoringConfig: { reading: ReadingRubric; questions: { total: 60; perQuestion: 15 }; total: 100 } = {
  reading: { total: 40, criteria: [] }, questions: { total: 60, perQuestion: 15 }, total: 100,
};
function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}
export function generateMockTest(options: GeneratorOptions = {}): MockTestResult {
  const { previousQuestionIds = [], previousReadingId, random = Math.random } = options;
  const readings = readingTests.filter(r => r.id !== previousReadingId);
  const reading = shuffle(readings.length ? readings : readingTests, random)[0];
  const previous = new Set(previousQuestionIds);
  const choose = (pool: SpeakingQuestion[]) => {
    const candidates = shuffle(pool, random).sort((a,b) => Number(previous.has(a.id)) - Number(previous.has(b.id)));
    if (!candidates.length) throw new Error('Not enough questions for the mock exam');
    return candidates[0];
  };
  const images = speakingQuestions.filter(q => q.type === 'image' && q.visual?.content);
  const person = choose(images.filter(q => q.id.startsWith('pattern_age_') && q.question.includes('さんは何さい')));
  const order = choose(images.filter(q => q.id.startsWith('pattern_order_')));
  const location = choose(images.filter(q => q.question === 'ここはどこですか。'));
  const direct = choose(speakingQuestions.filter(q => q.type === 'direct' && ![person,order,location].some(x => x.question === q.question)));
  return { reading, speaking: [person, order, location, direct] };
}
