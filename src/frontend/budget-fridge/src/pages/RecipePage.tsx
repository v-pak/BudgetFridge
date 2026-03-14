import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import PillButton from '../components/utils/PillButton';
import SectionTitle from '../components/utils/SectionTitle';
import { saveRecipe } from '../utils/storage';

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

      {/* ── Left: image placeholder ── */}
      <div className="bg-bg-warm flex items-center justify-center p-15 border-r border-border relative">
        <div
          className="
            w-full max-w-110 aspect-4/3
            bg-linear-to-br from-[#DDD6CB] to-[#C8BFB2]
            border border-border rounded-card
            shadow-[0_8px_40px_rgba(44,40,36,0.08)]
            flex items-end justify-end p-4 relative
          "
        >
          <div className="absolute inset-2 border border-white/30 rounded-[12px]" />
          <span className="relative z-10 text-[11px] tracking-widest uppercase text-text-light bg-card-bg px-2.5 py-1 font-medium rounded-lg">
            photo
          </span>
        </div>
        <span className="absolute bottom-5 left-6 font-heading text-[12px] text-accent opacity-50">
          → generated image
        </span>
      </div>

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

        <SectionTitle>Ingredients</SectionTitle>
        <ul className="list-none mb-9">
          {recipe.ingredients.map((ing, i) => (
            <li
              key={i}
              className="flex justify-between text-[14px] py-2 border-b border-border font-light"
            >
              <span>{ing.item}</span>
              <span className="text-text-light text-[13px]">{ing.amount}</span>
            </li>
          ))}
        </ul>

        <SectionTitle>Steps</SectionTitle>
        <ol className="list-none mb-12">
          {recipe.steps.map((step, i) => (
            <li
              key={i}
              className="relative pl-10 py-4 border-b border-border text-[14px] leading-[1.7] font-light"
            >
              <span className="absolute left-0 top-4 text-[12px] text-accent font-medium tracking-[0.05em]">
                {String(i + 1).padStart(2, '0')}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="flex gap-3">
          <PillButton variant="filled-accent" onClick={handleSave} className="flex-1">
            {saveLabel}
          </PillButton>
          <PillButton variant="outlined" trailingArrow onClick={() => { nextRecipe(); setSaveStatus('idle'); }} className="flex-1">
            Show Me Another
          </PillButton>
        </div>

      </div>
    </div>
  );
}

