import { useState, useEffect, useCallback } from 'react';
import type { Recipe } from '../utils/types';
import { getSavedRecipes, deleteRecipe } from '../utils/storage';
import RecipeCardGrid from '../components/my-recipes/RecipeCardGrid';
import RecipePopup from '../components/my-recipes/RecipePopUp';
import EmptyState from '../components/my-recipes/EmptyState';

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    setRecipes(getSavedRecipes());
  }, []);

  const handleDelete = useCallback((name: string) => {
    setRecipes(deleteRecipe(name));
  }, []);

  const closePopup = useCallback(() => setActiveRecipe(null), []);

  return (
    <div className="min-h-screen bg-bg font-body">
      <main className="max-w-[1200px] mx-auto px-14 pt-[60px] pb-20">
        <h1 className="font-heading text-[52px] font-bold text-text tracking-[-0.5px] mb-2">
          My Recipes
        </h1>
        <p className="text-[13px] text-text-light font-light mb-12">
          {recipes.length === 0
            ? 'No saved recipes'
            : `${recipes.length} saved ${recipes.length === 1 ? 'recipe' : 'recipes'}`}
        </p>

        {recipes.length === 0 ? (
          <EmptyState />
        ) : (
          <RecipeCardGrid recipes={recipes} onCardClick={setActiveRecipe} />
        )}
      </main>

      {activeRecipe && (
        <RecipePopup
          recipe={activeRecipe}
          onClose={closePopup}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
