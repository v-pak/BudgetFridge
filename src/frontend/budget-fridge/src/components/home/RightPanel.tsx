import { FridgeItemsList } from './FridgeItemsList';
import PillButton from '../utils/PillButton';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../../context/RecipeContext';

export function RightPanel() {
  const { ingredients, removeIngredient } = useRecipe();
  const navigate = useNavigate();

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
        onClick={() => navigate('/loading')}
        className="mt-9 w-full max-w-[360px]"
      >
        Generate Recipes
      </PillButton>
    </div>
  );
}