import { VocabularyCard, FlashCard } from '../../types';
import { lesson1_1Cards } from './lesson-1-1';
import { lesson1_2Cards } from './lesson-1-2';
import { lesson1_3Cards } from './lesson-1-3';
import { lesson2_1Cards } from './lesson-2-1';
import { lesson2_2Cards } from './lesson-2-2';
import { lesson2_3Cards } from './lesson-2-3';
import { lesson3_1Cards } from './lesson-3-1';
import { lesson3_2Cards } from './lesson-3-2';
import { lesson3_3Cards } from './lesson-3-3';
import { examPriorityCards } from './exam-priority';

export {
  lesson1_1Cards,
  lesson1_2Cards,
  lesson1_3Cards,
  lesson2_1Cards,
  lesson2_2Cards,
  lesson2_3Cards,
  lesson3_1Cards,
  lesson3_2Cards,
  lesson3_3Cards,
  examPriorityCards,
};

// Aliases for backward compatibility
export const bai1_1Cards = lesson1_1Cards;
export const bai1_2Cards = lesson1_2Cards;
export const bai1_3Cards = lesson1_3Cards;
export const bai2_1Cards = lesson2_1Cards;
export const bai2_2Cards = lesson2_2Cards;
export const bai2_3Cards = lesson2_3Cards;
export const bai3_1Cards = lesson3_1Cards;
export const bai3_2Cards = lesson3_2Cards;
export const bai3_3Cards = lesson3_3Cards;

export const allLessonCards: (VocabularyCard & FlashCard)[] = [
  ...lesson1_1Cards, ...lesson1_2Cards, ...lesson1_3Cards, ...lesson2_1Cards, ...lesson2_2Cards, ...lesson2_3Cards, ...lesson3_1Cards, ...lesson3_2Cards, ...lesson3_3Cards
];

export const DECKS: { id: string; label: string; cards: FlashCard[] }[] = [
  { id: 'Bài 1.1', label: 'Bài 1.1', cards: lesson1_1Cards },
  { id: 'Bài 1.2', label: 'Bài 1.2', cards: lesson1_2Cards },
  { id: 'Bài 1.3', label: 'Bài 1.3', cards: lesson1_3Cards },
  { id: 'Bài 2.1', label: 'Bài 2.1', cards: lesson2_1Cards },
  { id: 'Bài 2.2', label: 'Bài 2.2', cards: lesson2_2Cards },
  { id: 'Bài 2.3', label: 'Bài 2.3', cards: lesson2_3Cards },
  { id: 'Bài 3.1', label: 'Bài 3.1', cards: lesson3_1Cards },
  { id: 'Bài 3.2', label: 'Bài 3.2', cards: lesson3_2Cards },
  { id: 'Bài 3.3', label: 'Bài 3.3', cards: lesson3_3Cards },
  { id: 'Exam Priority', label: 'Exam Priority', cards: examPriorityCards },
  { id: 'All', label: 'Tất cả (Bài 1.1 → 3.3)', cards: allLessonCards },
];
