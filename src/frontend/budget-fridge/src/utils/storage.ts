import type { FridgeItem } from './types';

const FRIDGE_KEY = 'fridgeItems';

export function loadFridgeItems(): FridgeItem[] {
  try {
    const raw = localStorage.getItem(FRIDGE_KEY);
    return raw ? (JSON.parse(raw) as FridgeItem[]) : [];
  } catch {
    return [];
  }
}

export function saveFridgeItems(items: FridgeItem[]): void {
  localStorage.setItem(FRIDGE_KEY, JSON.stringify(items));
}