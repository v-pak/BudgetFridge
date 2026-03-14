import { useEffect, useRef } from 'react';
import type { Recipe } from '../utils/types';

async function fetchRecipeImage(recipeName: string): Promise<string | null> {
  try {
    // Extract main ingredient for focused food search
    const recipeTerms = recipeName.toLowerCase().split(' ');
    // Focus on the main ingredient/dish name
    const mainTerm = recipeTerms[recipeTerms.length - 1]; // Usually the main dish is at the end
    
    const query = encodeURIComponent(mainTerm);
    
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&w=800&h=600&orientation=landscape&client_id=gAMHfVGcqvq1gm5cH1x3_OYLKWqYNvpY4N7xO1NfxCU&count=1`
    );

    if (!response.ok) {
      console.error(`Image API error: ${response.status}`);
      // Fallback to a delicious food image
      return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop`;
    }

    const data = await response.json();
    const imageUrl = Array.isArray(data) ? data[0]?.urls?.regular : data?.urls?.regular;
    return imageUrl || null;
  } catch (error) {
    console.error('Error fetching image:', error);
    // Fallback to a delicious food image
    return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop`;
  }
}

/**
 * Hook to fetch and attach images to recipes that don't have them yet
 */
export function useRecipeImages(recipes: Recipe[], onRecipesUpdate: (recipes: Recipe[]) => void) {
  const processedRecipesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (recipes.length === 0) return;

    // Find recipes without images that we haven't processed yet
    const recipesNeedingImages = recipes.filter(r => !r.imageUrl && !processedRecipesRef.current.has(r.name));
    if (recipesNeedingImages.length === 0) return;

    console.log(`Fetching images for ${recipesNeedingImages.length} recipes`);

    // Mark these recipes as being processed
    recipesNeedingImages.forEach(r => processedRecipesRef.current.add(r.name));

    // Fetch images for recipes that need them
    (async () => {
      const updatedRecipes = [...recipes];
      let hasChanges = false;
      
      for (const recipe of recipesNeedingImages) {
        const index = updatedRecipes.findIndex(r => r.name === recipe.name && !r.imageUrl);
        if (index !== -1) {
          console.log(`Fetching image for: ${recipe.name}`);
          const imageUrl = await fetchRecipeImage(recipe.name);
          if (imageUrl) {
            console.log(`Got image for ${recipe.name}`);
            updatedRecipes[index] = { ...updatedRecipes[index], imageUrl };
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        console.log('Updating recipes with images');
        onRecipesUpdate(updatedRecipes);
      }
    })();
  }, [recipes.length, onRecipesUpdate]); // Depend on recipe count and callback
}
