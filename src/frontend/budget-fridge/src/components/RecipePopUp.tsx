import { useState, useEffect } from 'react';
import type { Recipe } from '../utils/types';
import PillButton from './PillButton';
import PopupImage from './PopupImage';
import PopupIngredients from './PopupIngredients';
import PopupSteps from './PopupSteps';

interface RecipePopupProps {
  recipe: Recipe;
  onClose: () => void;
  onDelete: (name: string) => void;
}

export default function RecipePopup({ recipe, onClose, onDelete }: RecipePopupProps) {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleDelete = () => {
    onDelete(recipe.name);
    setRemoved(true);
    setTimeout(onClose, 500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-text/40 backdrop-blur-sm flex items-center justify-center z-[200] p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card-bg border border-border rounded-[20px] w-full max-w-[520px] max-h-[88vh] overflow-y-auto shadow-[0_20px_80px_rgba(44,40,36,0.18)] relative"
        style={{ animation: 'popupIn 0.25s ease' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-border bg-card-bg text-text-light text-lg leading-none flex items-center justify-center hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
        >
          ×
        </button>

        <PopupImage recipeName={recipe.name} />

        <div className="px-9 pt-8 pb-9">
          <p className="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-2">
            Saved Recipe
          </p>
          <h2 className="font-heading text-[36px] font-bold leading-[1.05] text-text mb-[6px]">
            {recipe.name}
          </h2>
          <div className="flex items-center gap-2 text-[13px] text-text-light font-body mb-5">
            <span>{recipe.cookTime}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-text-light inline-block" />
            <span>Serves {recipe.serves}</span>
          </div>
          <p className="font-body text-[14px] leading-[1.7] text-text font-light mb-7">
            {recipe.description}
          </p>

          <PopupIngredients ingredients={recipe.ingredients} />
          <PopupSteps steps={recipe.steps} />

          <PillButton
            variant="outlined"
            onClick={handleDelete}
            disabled={removed}
            className="w-full"
          >
            {removed ? 'Removed' : 'Remove Recipe'}
          </PillButton>
        </div>
      </div>

      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}