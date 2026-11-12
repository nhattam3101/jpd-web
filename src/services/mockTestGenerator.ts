import { ReadingTest, SpeakingQuestion } from '../types';
import { readingTests } from '../data/readingTests';
import { speakingQuestions } from '../data/speakingQuestions';

export type TestLength = 'quick' | 'standard' | 'full';
export type TestPreset = 'lesson1' | 'lesson2' | 'lesson3' | 'mixed' | 'priority';
export type MockTestResult = { reading: ReadingTest; speaking: SpeakingQuestion[] };
export type GeneratorOptions = {
  length?: TestLength;
  preset?: TestPreset;
  previousQuestionIds?: string[];
  previousReadingId?: string;
  random?: () => number;
};

const counts: Record<TestLength, number> = { quick: 3, standard: 5, full: 8 };
const groups: SpeakingQuestion['group'][] = ['personal', 'objects', 'commerce', 'schedule'];

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateMockTest(options: GeneratorOptions = {}): MockTestResult {
  const { length = 'quick', preset = 'mixed', previousQuestionIds = [], previousReadingId, random = Math.random } = options;
  const lesson = preset.startsWith('lesson') ? preset.slice(-1) : undefined;
  const readingPool = readingTests.filter(r => !lesson || r.lessons.includes(lesson));
  const freshReadings = readingPool.filter(r => r.id !== previousReadingId);
  const reading = shuffle(freshReadings.length ? freshReadings : readingPool, random)[0];
  const pool = speakingQuestions.filter(q => !lesson || q.lesson === lesson);
  const count = counts[length];
  if (!reading || pool.length < count) throw new Error('Not enough questions or reading passages for this preset');
  const previous = new Set(previousQuestionIds);
  const selected: SpeakingQuestion[] = [];
  const shuffled = shuffle(pool, random);

  const unused = (q: SpeakingQuestion) => !selected.some(existing => existing.question.replace(/[\s。、？?]/g, '') === q.question.replace(/[\s。、？?]/g, ''));
  const pick = (filter: (q: SpeakingQuestion) => boolean) => {
    const candidates = shuffled.filter(q => unused(q) && filter(q));
    candidates.sort((a, b) => Number(previous.has(a.id)) - Number(previous.has(b.id)) ||
      (preset === 'priority' ? Number(b.examPriority) - Number(a.examPriority) : 0));
    if (candidates[0]) selected.push(candidates[0]);
  };
  // Coverage is meaningful for mixed/priority; lesson-only tests remain within their lesson.
  if (length === 'full' && !lesson) groups.forEach(group => pick(q => q.group === group));
  while (selected.length < count) {
    const totals = ['1', '2', '3'].map(l => selected.filter(q => q.lesson === l).length);
    const available = ['1', '2', '3'].filter(l => pool.some(q => q.lesson === l && unused(q)));
    const least = Math.min(...available.map(l => totals[Number(l) - 1]));
    const target = shuffle(available.filter(l => totals[Number(l) - 1] === least), random)[0];
    pick(q => q.lesson === target);
  }
  return { reading, speaking: shuffle(selected, random) };
}
