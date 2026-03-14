export interface FridgeItem {
  name: string;
  quantity: string;
}
 
export interface Recipe {
  name: string;
  imageDescription: string;
  description: string;
  ingredients: { item: string; amount: string }[];
  cookTime: string;
  serves: string;
  steps: string[];
}

export interface RecipeContextValue {
  /** Current ingredient list (synced to localStorage) */
  ingredients: FridgeItem[];
  setIngredients: (items: FridgeItem[]) => void;
  addIngredient: (item: FridgeItem) => void;
  removeIngredient: (index: number) => void;
 
  /** Recipes returned by the API */
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
 
  /** Index of the currently displayed recipe (0-based) */
  currentRecipeIndex: number;
  setCurrentRecipeIndex: (index: number) => void;
  nextRecipe: () => void;
 
  /** Reset all transient state (call after a new generation) */
  reset: () => void;
}