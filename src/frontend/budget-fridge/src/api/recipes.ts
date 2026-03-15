import type { FridgeItem, Recipe } from '../utils/types';

export async function fetchRecipes(ingredients: FridgeItem[]): Promise<Recipe[]> {
  const res = await fetch('/api/recipes', {
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
