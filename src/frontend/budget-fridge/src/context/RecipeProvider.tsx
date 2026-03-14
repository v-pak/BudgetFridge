import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { FridgeItem, Recipe, RecipeContextValue } from '../utils/types';
import { loadFridgeItems, saveFridgeItems } from '../utils/storage';

export const RecipeContext = createContext<RecipeContextValue | null>(null);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [ingredients, setIngredientsState] = useState<FridgeItem[]>(loadFridgeItems);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const setIngredients = useCallback((items: FridgeItem[]) => {
    setIngredientsState(items);
    saveFridgeItems(items);
  }, []);

  const addIngredient = useCallback((item: FridgeItem) => {
    setIngredientsState((prev) => {
      const next = [...prev, item];
      saveFridgeItems(next);
      return next;
    });
  }, []);

  const removeIngredient = useCallback((index: number) => {
    setIngredientsState((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveFridgeItems(next);
      return next;
    });
  }, []);

  const nextRecipe = useCallback(() => {
    setCurrentRecipeIndex((prev) =>
      recipes.length > 0 ? (prev + 1) % recipes.length : 0,
    );
  }, [recipes.length]);

  const reset = useCallback(() => {
    setRecipes([]);
    setCurrentRecipeIndex(0);
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        ingredients,
        setIngredients,
        addIngredient,
        removeIngredient,
        recipes,
        setRecipes,
        currentRecipeIndex,
        setCurrentRecipeIndex,
        nextRecipe,
        reset,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}