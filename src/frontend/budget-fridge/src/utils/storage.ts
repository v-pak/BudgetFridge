import type { FridgeItem } from './types';
import type { Recipe } from './types';

const FRIDGE_KEY = 'fridgeItems';
const SAVED_KEY = 'savedRecipes';

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

export function getSavedRecipes(): Recipe[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? (JSON.parse(raw) as Recipe[]) : [];
  } catch {
    return [];
  }
}

export function saveRecipe(recipe: Recipe): void {
  const existing = getSavedRecipes();
  if (existing.some((r) => r.name === recipe.name)) return;
  localStorage.setItem(SAVED_KEY, JSON.stringify([...existing, recipe]));
}

export function deleteRecipe(name: string): Recipe[] {
  const updated = getSavedRecipes().filter((r) => r.name !== name);
  localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
  return updated;
}