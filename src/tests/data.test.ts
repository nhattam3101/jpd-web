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
import { questionPatterns } from '../data/questionPatterns';

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

describe('Mock test data', () => {
  it('contains the requested reading distribution and Japanese-only passages', () => {
    expect(readingTests.length).toBeGreaterThanOrEqual(40);
    expect(new Set(readingTests.map(r => r.id)).size).toBe(readingTests.length);
    expect(new Set(readingTests.map(r => r.text)).size).toBe(readingTests.length);
    for (const reading of readingTests) {
      expect(reading.text).not.toMatch(/[a-zA-ZÀ-ỹ]/);
      expect(reading.text.replace(/[\s。、]/g, '').length).toBeGreaterThanOrEqual(90);
      expect(reading.text.replace(/[\s。、]/g, '').length).toBeLessThanOrEqual(170);
    }
  });

  it('contains forty distinct questions per lesson with complete answers and visuals', () => {
    expect(['1', '2', '3'].every(lesson => speakingQuestions.filter(q => q.lesson === lesson).length >= 40)).toBe(true);
    expect(new Set(speakingQuestions.map(q => q.id)).size).toBe(speakingQuestions.length);

    const learnedKanji = new Set(Array.from('一七三九二五何先八六円分十四土大学日時曜月木本校水火生誕語金私')); 
    for (const q of speakingQuestions) {
      for (const character of (q.question + q.expectedAnswers.join('')).match(/[一-龯]/g) ?? []) {
        expect(learnedKanji.has(character)).toBe(true);
      }
      expect(q.expectedAnswers.length).toBeGreaterThan(0);
      expect(q.expectedAnswers.every(answer => answer.trim())).toBe(true);
      expect(q.vietnameseMeaning.trim()).not.toBe('');
      expect(['easy', 'medium', 'hard']).toContain(q.difficulty);
      if (q.type === 'image') expect(q.visual?.content.trim()).toBeTruthy();
    }
  });
});

describe('Mock test generator', () => {
  it('generates one reading and three distinct picture categories followed by one direct question', () => {
    for (let i = 0; i < 100; i++) {
      const exam = generateMockTest();
      expect(exam.reading.text.trim()).toBeTruthy();
      expect(exam.speaking).toHaveLength(4);
      expect(exam.speaking.map(q => q.type)).toEqual(['image','image','image','direct']);
      expect(new Set(exam.speaking.map(q => q.id)).size).toBe(4);
      expect(new Set(exam.speaking.map(q => q.question)).size).toBe(4);
      expect(exam.speaking.slice(0, 3).every(q => q.visual?.content.trim())).toBe(true);
      expect(exam.speaking.every(q => q.expectedAnswers.every(a => a.trim()))).toBe(true);
      expect(exam.speaking[0].question).toContain('何さい');
      expect(exam.speaking[1].question).toContain('ごちゅうもん');
      expect(exam.speaking[2].question).toBe('ここはどこですか。');
    }
  });
});

describe('Question patterns', () => {
  it('has unique IDs, explanations, examples and valid vocabulary references', () => {
    expect(new Set(questionPatterns.map(p => p.id)).size).toBe(questionPatterns.length);
    const ids = new Set(allLessonCards.map(c => c.id));
    for (const pattern of questionPatterns) {
      expect(pattern.questionWord && pattern.meaning && pattern.answerPattern).toBeTruthy();
      expect(pattern.examples.length).toBeGreaterThanOrEqual(5);
      for (const example of pattern.examples) {
        expect(example.question && example.answer).toBeTruthy();
        expect(example.vocabularyIds.every(id => ids.has(id))).toBe(true);
      }
    }
  });
  it('uses the centralized examples for every mock question', () => {
    const allExamples = new Set(questionPatterns.flatMap(p => p.examples.map(e => `${e.question}|${e.answer}`)));
    for (const q of speakingQuestions) expect(allExamples.has(`${q.question}|${q.expectedAnswers[0]}`)).toBe(true);
  });
  it('keeps choice and location particles distinct', () => {
    expect(questionPatterns.find(p => p.id === 'choice')?.answerPattern).toContain('これ');
    expect(questionPatterns.find(p => p.id === 'choice-noun')?.answerPattern).toContain('この');
    expect(questionPatterns.find(p => p.id === 'go')?.answerPattern).toContain('へ');
    expect(questionPatterns.find(p => p.id === 'activity')?.answerPattern).toContain('で');
  });
});
