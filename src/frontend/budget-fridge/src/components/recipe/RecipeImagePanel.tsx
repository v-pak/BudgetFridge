import { useRecipe } from '../../context/RecipeContext';

export default function RecipeImagePanel() {
  const { recipes, currentRecipeIndex } = useRecipe();
  const recipe = recipes[currentRecipeIndex];
  const imageUrl = recipe?.imageUrl;

  return (
    <div className="bg-bg-warm flex items-center justify-center p-15 border-r border-border relative">
      <div
        className="
          w-full h-full
          bg-linear-to-br from-[#DDD6CB] to-[#C8BFB2]
          border border-border rounded-card
          shadow-[0_8px_40px_rgba(44,40,36,0.08)]
          flex items-end justify-end p-4 relative overflow-hidden
        "
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={recipe?.name || 'Recipe'}
            className="absolute inset-0 w-full h-full object-cover rounded-card"
          />
        ) : null}
        <div className="absolute inset-2 border border-white/30 rounded-[12px]" />
        <span className="relative z-10 text-[11px] tracking-widest uppercase text-text-light bg-card-bg px-2.5 py-1 font-medium rounded-lg">
          photo
        </span>
      </div>
      <span className="absolute bottom-5 left-6 font-heading text-[12px] text-accent opacity-50">
        → image acquired from unsplash
      </span>
    </div>
  );
}
