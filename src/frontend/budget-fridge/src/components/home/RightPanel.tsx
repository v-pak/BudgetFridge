import { useState, useEffect } from 'react';
import { FridgeItemsList } from './FridgeItemsList';
import PillButton from '../utils/PillButton';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../../context/RecipeContext';
import { fetchRecipes } from '../../api/recipes';
import FridgeHeader from './FridgeHeader';

export function RightPanel() {
  const { ingredients, removeIngredient, setRecipes } = useRecipe();
  const navigate = useNavigate();

  // All indices selected by default; sync when ingredients change
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    () => new Set(ingredients.map((_, i) => i))
  );

  // When a new ingredient is added, auto-select it
  useEffect(() => {
    setSelectedIndices(prev => {
      const next = new Set(prev);
      ingredients.forEach((_, i) => {
        if (!next.has(i)) next.add(i);
      });
      // Remove stale indices that no longer exist
      for (const idx of next) {
        if (idx >= ingredients.length) next.delete(idx);
      }
      return next;
    });
  }, [ingredients.length]);

  const allSelected = selectedIndices.size === ingredients.length && ingredients.length > 0;
  const someSelected = selectedIndices.size > 0;

  function toggleAll() {
    if (allSelected) {
      setSelectedIndices(new Set());
    } else {
      setSelectedIndices(new Set(ingredients.map((_, i) => i)));
    }
  }

  function toggleOne(index: number) {
    setSelectedIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function handleRemove(index: number) {
    removeIngredient(index);
    // Re-map selected indices after removal
    setSelectedIndices(prev => {
      const next = new Set<number>();
      for (const idx of prev) {
        if (idx < index) next.add(idx);
        else if (idx > index) next.add(idx - 1);
        // idx === index is dropped (removed item)
      }
      return next;
    });
  }

  async function getRecipes() {
    const selected = ingredients.filter((_, i) => selectedIndices.has(i));
    navigate('/loading');
    try {
      const recipes = await fetchRecipes(selected);
      setRecipes(recipes);
      navigate('/recipe');
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    }
  }

  return (
    <div className="flex flex-col items-center px-[60px] py-[60px] bg-bg-warm border-l border-border relative">
      <FridgeHeader
        showCheckbox={ingredients.length > 0}
        allSelected={allSelected}
        someSelected={someSelected}
        onToggleAll={toggleAll}
      />

      <FridgeItemsList
        items={ingredients}
        selectedIndices={selectedIndices}
        onToggle={toggleOne}
        onRemove={handleRemove}
      />

      <PillButton
        variant="filled-dark"
        trailingArrow
        disabled={selectedIndices.size === 0}
        onClick={getRecipes}
        className="mt-9 w-full max-w-[360px]"
      >
        Generate Recipes
        {selectedIndices.size > 0 && selectedIndices.size < ingredients.length && (
          <span className="opacity-50 normal-case tracking-normal text-[12px]">
            ({selectedIndices.size})
          </span>
        )}
      </PillButton>
    </div>
  );
}