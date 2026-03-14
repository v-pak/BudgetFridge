import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';

export default function LoadingPage() {
  const { ingredients } = useRecipe();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/recipe');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)]">
      <div className="flex flex-col items-center gap-8">
        <div className="w-14 h-14 rounded-full border-2 border-border border-t-accent animate-spin" />
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-heading text-[24px] text-text-light">
            finding the perfect recipe…
          </p>
          <p className="text-[13px] text-text-light opacity-60 italic">
            crafting ideas from {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
