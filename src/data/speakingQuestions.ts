import { questionPatterns } from './questionPatterns';
import type { SpeakingQuestion } from '../types';

// The mock exam consumes the same examples displayed in Question Recognition.
export const speakingQuestions: SpeakingQuestion[] = questionPatterns.flatMap(pattern =>
  pattern.examples.map((example, index) => example.seed ?? ({
    id: `pattern_${pattern.id}_${index + 1}`,
    lesson: pattern.lesson,
    type: example.visual ? 'image' as const : 'direct' as const,
    question: example.question,
    expectedAnswers: [example.answer],
    vietnameseMeaning: example.meaning ?? pattern.meaning,
    difficulty: pattern.difficulty,
    group: pattern.group,
    examPriority: true,
    ...(example.visual ? {visual: {kind:'text' as const, content:example.visual}} : {}),
  }))
);
