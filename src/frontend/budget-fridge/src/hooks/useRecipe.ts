import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeProvider';

export function useRecipe() {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipe must be used inside RecipeProvider');
  return ctx;
}