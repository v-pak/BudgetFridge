import { createContext, useContext } from 'react';
import type { RecipeContextValue } from '../utils/types';

export const RecipeContext = createContext<RecipeContextValue | null>(null);

export function useRecipe(): RecipeContextValue {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipe must be used within a RecipeProvider');
  return ctx;
}
