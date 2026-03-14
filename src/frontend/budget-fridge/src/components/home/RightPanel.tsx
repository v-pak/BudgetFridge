import { FridgeItemsList } from './FridgeItemsList';
import PillButton from '../utils/PillButton';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../../context/RecipeContext';
import type { FridgeItem } from '../../utils/types';

export function RightPanel() {
  const { ingredients, removeIngredient } = useRecipe();
  const navigate = useNavigate();

  async function getRecipes(ingredients: FridgeItem[]) {
    navigate('/loading');
    console.log(ingredients);
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredients)
      });
      const data = await res.json();
      console.log(data);
      navigate('/recipe');
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    }
  }

  return (
    <div className="flex flex-col items-center px-[60px] py-[60px] bg-bg-warm border-l border-border relative">
      <div className="flex items-center gap-3 w-full max-w-[360px] mb-8 font-heading text-[28px] font-medium text-text">
        Your Fridge
        <span className="flex-1 h-px bg-accent opacity-40" />
      </div>
      <FridgeItemsList items={ingredients} onRemove={removeIngredient} />
      <PillButton
        variant="filled-dark"
        trailingArrow
        disabled={ingredients.length === 0}
        onClick={() => getRecipes(ingredients)}
        className="mt-9 w-full max-w-[360px]"
      >
        Generate Recipes
      </PillButton>
    </div>
  );
}