import type { FridgeItem, Recipe } from '../utils/types';

export async function fetchRecipes(ingredients: FridgeItem[]): Promise<Recipe[]> {
  const base = import.meta.env.VITE_API_URL ?? '';
  const res = await fetch(`${base}/api/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ingredients),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch recipes: ${res.status} ${res.statusText}`);
  }

  const data = await res.json() as Recipe[];
  console.log(data);
  return data;
}
