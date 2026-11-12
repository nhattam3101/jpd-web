import { CardProgressMap } from '../types';

const STORAGE_KEY = 'learning_jpd_progress_v1';

export function loadProgress(): CardProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return {};
  }
}

export function saveProgress(progress: CardProgressMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function updateCardStatus(cardId: string, status: 'known' | 'unknown'): CardProgressMap {
  const current = loadProgress();
  current[cardId] = status;
  saveProgress(current);
  return { ...current };
}

export function resetCardsProgress(cardIds: string[]): CardProgressMap {
  const current = loadProgress();
  cardIds.forEach(id => {
    delete current[id];
  });
  saveProgress(current);
  return { ...current };
}

export function clearAllProgress(): CardProgressMap {
  localStorage.removeItem(STORAGE_KEY);
  return {};
}
