import type { FridgeItem, Recipe } from './types';

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

export function saveRecipe(recipe: Recipe): boolean {
  const current = getSavedRecipes();
  if (current.some((r) => r.name === recipe.name)) return false;
  localStorage.setItem(SAVED_KEY, JSON.stringify([...current, recipe]));
  return true;
}
 
/** Removes the recipe matching the given name from localStorage. */
export function deleteRecipe(name: string): void {
  const updated = getSavedRecipes().filter((r) => r.name !== name);
  localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
}