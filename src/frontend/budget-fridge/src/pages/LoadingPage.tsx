import { useRecipe } from '../context/RecipeContext';
import wokSvg from '../assets/wok.svg';

export default function LoadingPage() {
  const { ingredients } = useRecipe();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-73px)]">
      <div className="flex flex-col items-center gap">
        <img src={wokSvg} alt="Loading" className="w-85 h-85 animate-bob" />
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
