import { describe, it, expect } from 'vitest';
import {
  allLessonCards,
  examPriorityCards,
  lesson1_1Cards,
  lesson1_2Cards,
  lesson1_3Cards,
  lesson2_1Cards,
  lesson2_2Cards,
  lesson2_3Cards,
  lesson3_1Cards,
  lesson3_2Cards,
  lesson3_3Cards
} from '../data/vocabulary';
import { readingTests } from '../data/readingTests';
import { speakingQuestions } from '../data/speakingQuestions';
import { generateMockTest } from '../services/mockTestGenerator';

const VALID_LESSONS = new Set([
  '1.1', '1.2', '1.3',
  '2.1', '2.2', '2.3',
  '3.1', '3.2', '3.3'
]);

describe('Vocabulary Data Validation', () => {
  it('vocabulary IDs are strictly unique across all lessons', () => {
    const ids = allLessonCards.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('no card is missing kana', () => {
    for (const card of allLessonCards) {
      expect(card.kana).toBeDefined();
      expect(typeof card.kana).toBe('string');
      expect(card.kana.trim().length).toBeGreaterThan(0);
    }
  });

  it('no card is missing Vietnamese meaning', () => {
    for (const card of allLessonCards) {
      expect(card.vietnamese).toBeDefined();
      expect(typeof card.vietnamese).toBe('string');
      expect(card.vietnamese.trim().length).toBeGreaterThan(0);
    }
  });

  it('no card is missing pronunciation', () => {
    for (const card of allLessonCards) {
      expect(card.pronunciation).toBeDefined();
      expect(typeof card.pronunciation).toBe('string');
      expect(card.pronunciation.trim().length).toBeGreaterThan(0);
    }
  });

  it('each card has a valid lesson format (1.1 - 3.3)', () => {
    for (const card of allLessonCards) {
      expect(VALID_LESSONS.has(card.lesson)).toBe(true);
    }
  });

  it('contains expected card count across all 9 lessons (356 cards)', () => {
    expect(allLessonCards.length).toBe(356);
    expect(lesson1_1Cards.length).toBe(55);
    expect(lesson1_2Cards.length).toBe(48);
    expect(lesson1_3Cards.length).toBe(11);
    expect(lesson2_1Cards.length).toBe(49);
    expect(lesson2_2Cards.length).toBe(43);
    expect(lesson2_3Cards.length).toBe(38);
    expect(lesson3_1Cards.length).toBe(64);
    expect(lesson3_2Cards.length).toBe(30);
    expect(lesson3_3Cards.length).toBe(18);
  });

  it('exam priority dataset contains 192 cards with high priority', () => {
    expect(examPriorityCards.length).toBe(192);
    for (const card of examPriorityCards) {
      expect(card.priority).toBe('high');
      expect(card.kana.trim().length).toBeGreaterThan(0);
      expect(card.vietnamese.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('Reading Tests Validation', () => {
  it('reading tests list is not empty and has at least 10 tests', () => {
    expect(readingTests.length).toBeGreaterThanOrEqual(10);
  });

  it('each reading test has valid non-empty fields', () => {
    const ids = new Set<string>();
    for (const test of readingTests) {
      expect(test.id).toBeDefined();
      expect(ids.has(test.id)).toBe(false);
      ids.add(test.id);

      expect(test.title.trim().length).toBeGreaterThan(0);
      expect(test.text.trim().length).toBeGreaterThan(0);
      expect(test.lessons.length).toBeGreaterThan(0);

      // Verify no Romaji or Vietnamese words in reading text
      expect(test.text).not.toMatch(/[a-zA-Z]/);
      expect(test.text).not.toMatch(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i);

      // Character count roughly 100 - 150 Japanese characters
      const cleanChars = test.text.replace(/[\s\n\r。、「」]/g, '');
      expect(cleanChars.length).toBeGreaterThanOrEqual(90);
      expect(cleanChars.length).toBeLessThanOrEqual(170);
    }
  });
});

describe('Speaking Question Bank Validation', () => {
  it('speaking questions list has at least 40 questions', () => {
    expect(speakingQuestions.length).toBeGreaterThanOrEqual(40);
  });

  it('all speaking questions have non-empty expectedAnswers and vietnameseMeaning', () => {
    const ids = new Set<string>();
    for (const q of speakingQuestions) {
      expect(q.id).toBeDefined();
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);

      expect(q.question.trim().length).toBeGreaterThan(0);
      expect(Array.isArray(q.expectedAnswers)).toBe(true);
      expect(q.expectedAnswers.length).toBeGreaterThan(0);
      for (const ans of q.expectedAnswers) {
        expect(ans.trim().length).toBeGreaterThan(0);
      }
      expect(q.vietnameseMeaning.trim().length).toBeGreaterThan(0);
    }
  });

  it('contains both image and direct question types', () => {
    const imageQuestions = speakingQuestions.filter(q => q.type === 'image');
    const directQuestions = speakingQuestions.filter(q => q.type === 'direct');

    expect(imageQuestions.length).toBeGreaterThanOrEqual(15);
    expect(directQuestions.length).toBeGreaterThanOrEqual(15);

    for (const imgQ of imageQuestions) {
      expect(imgQ.visual).toBeDefined();
      expect(imgQ.visual?.content.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('Mock Test Generator Service', () => {
  it('generates a mock test with exactly 1 reading passage and 3 speaking questions', () => {
    for (let i = 0; i < 20; i++) {
      const mock = generateMockTest();
      expect(mock.reading).toBeDefined();
      expect(mock.reading.text.trim().length).toBeGreaterThan(0);

      expect(Array.isArray(mock.speaking)).toBe(true);
      expect(mock.speaking.length).toBe(3);
    }
  });

  it('no duplicate speaking questions within a single generated mock test', () => {
    for (let i = 0; i < 30; i++) {
      const mock = generateMockTest();
      const questionIds = mock.speaking.map(q => q.id);
      const uniqueIds = new Set(questionIds);
      expect(uniqueIds.size).toBe(3);
    }
  });

  it('prioritizes 2 image questions and 1 direct question', () => {
    let balancedCount = 0;
    const iterations = 50;
    for (let i = 0; i < iterations; i++) {
      const mock = generateMockTest();
      const imageCount = mock.speaking.filter(q => q.type === 'image').length;
      const directCount = mock.speaking.filter(q => q.type === 'direct').length;
      if (imageCount === 2 && directCount === 1) {
        balancedCount++;
      }
    }
    // Since our pool has 26 image and 26 direct questions, it should consistently produce 2 image + 1 direct
    expect(balancedCount).toBe(iterations);
  });
});

