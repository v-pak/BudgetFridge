import type { Recipe } from '../utils/types';
import RecipeCard from './RecipeCard';

interface RecipeCardGridProps {
  recipes: Recipe[];
  onCardClick: (recipe: Recipe) => void;
}

export default function RecipeCardGrid({ recipes, onCardClick }: RecipeCardGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.name}
          recipe={recipe}
          onClick={() => onCardClick(recipe)}
        />
      ))}
    </div>
  );
}