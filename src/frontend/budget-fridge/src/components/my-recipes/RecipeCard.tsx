import type { Recipe } from '../../utils/types';
import { cardGradient } from '../../utils/cardGradient';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div
      onClick={onClick}
      className="
        bg-bg-warm border border-border rounded-[16px] overflow-hidden
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(44,40,36,0.10)]
        shadow-[0_2px_8px_rgba(44,40,36,0.04)]
      "
    >
      <div
        className="w-full aspect-[4/3] relative overflow-hidden"
        style={{ background: recipe.imageUrl ? undefined : cardGradient(recipe.name) }}
      >
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-[6px] border border-white/25" />
        <span className="absolute bottom-3 right-3 bg-card-bg text-text-light text-[11px] font-medium tracking-[0.05em] px-[10px] py-[3px] rounded-lg font-body">
          {recipe.cookTime}
        </span>
      </div>

      <div className="px-5 pt-[18px] pb-4">
        <div className="font-heading text-[20px] font-medium text-text leading-tight">
          {recipe.name}
        </div>
        <div className="mt-[6px] text-[12px] text-text-light font-light font-body">
          Serves {recipe.serves}
        </div>
      </div>
    </div>
  );
}