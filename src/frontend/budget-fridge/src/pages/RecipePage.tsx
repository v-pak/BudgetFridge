import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import { saveRecipe } from '../utils/storage';
import RecipeImagePanel from '../components/recipe/RecipeImagePanel';
import RecipeIngredientsList from '../components/recipe/RecipeIngredientsList';
import RecipeStepsList from '../components/recipe/RecipeStepsList';
import RecipeActions from '../components/recipe/RecipeActions';

export default function RecipePage() {
  const { recipes, currentRecipeIndex, nextRecipe } = useRecipe();
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'duplicate'>('idle');

  useEffect(() => {
    if (recipes.length === 0) navigate('/');
  }, [recipes.length, navigate]);

  if (recipes.length === 0) return null;

  const recipe = recipes[currentRecipeIndex];
  const displayNum = String(currentRecipeIndex + 1).padStart(2, '0');
  const displayTotal = String(recipes.length).padStart(2, '0');

  function handleSave() {
    const success = saveRecipe(recipe);
    setSaveStatus(success ? 'saved' : 'duplicate');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }

  const saveLabel =
    saveStatus === 'saved' ? 'Saved!' :
    saveStatus === 'duplicate' ? 'Already Saved' :
    'Save Recipe';

  return (
    <div className="grid grid-cols-[5fr_4fr] min-h-200">

      <RecipeImagePanel />

      {/* ── Right: recipe details ── */}
      <div className="px-14 py-15 overflow-y-auto">

        <p className="text-[11px] tracking-[0.15em] uppercase text-accent font-medium mb-3">
          Recipe {displayNum} / {displayTotal}
        </p>

        <h1 className="font-heading text-[48px] font-bold leading-[1.05] text-text mb-2">
          {recipe.name}
        </h1>

        <div className="flex items-center gap-2 text-[13px] text-text-light mb-6">
          <span>{recipe.cookTime}</span>
          <span className="w-0.75 h-0.75 rounded-full bg-text-light inline-block" />
          <span>Serves {recipe.serves}</span>
        </div>

        <p className="text-[15px] leading-[1.7] text-text font-light max-w-105 mb-9">
          {recipe.description}
        </p>

        <RecipeIngredientsList ingredients={recipe.ingredients} />

        <RecipeStepsList steps={recipe.steps} />

        <RecipeActions
          saveLabel={saveLabel}
          onSave={handleSave}
          onNext={() => { nextRecipe(); setSaveStatus('idle'); }}
        />

      </div>
    </div>
  );
}
