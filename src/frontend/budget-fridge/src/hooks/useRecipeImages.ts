import { useEffect, useRef } from 'react';
import type { Recipe } from '../utils/types';

// Curated food images - organized by dish type and ingredient combinations
// Fill in your own URLs here - these are placeholders to get you started
const DISH_IMAGES: { [key: string]: string[] } = {
  // Specific dishes first (most accurate)
  'congee': [
    'https://images.unsplash.com/photo-1621658537360-dfcb008fe19f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
  'soup': [
    'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
  'stir-fry': [
    'https://images.unsplash.com/photo-1707056503922-91c9ebaf0774?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RpciUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D'
  ],
  'fried rice': [
    'https://images.unsplash.com/photo-1609570324378-ec0c4c9b6ba8?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZWQlMjByaWNlfGVufDB8fDB8fHww'
  ],
  'curry': [
    'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3Vycnl8ZW58MHx8MHx8fDA%3D'
  ],
  'bowl': [
    'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJvd2x8ZW58MHx8MHx8fDA%3D'
  ],
  'sauté': [
    'https://plus.unsplash.com/premium_photo-1723795276835-f007ade51aad?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2F1dGV8ZW58MHx8MHx8fDA%3D'
  ],
  'grilled': [
    'https://images.unsplash.com/photo-1593708659671-595be1c95128?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGdyaWxsZWR8ZW58MHx8MHx8fDA%3D'
  ],
  'pasta': [
    'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFzdGF8ZW58MHx8MHx8fDA%3D'
  ],
  
  // Main proteins
  'chicken': [
    'https://images.unsplash.com/photo-1568093858174-0f391ea21c45?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
  'salmon': [
    'https://plus.unsplash.com/premium_photo-1726768907990-d3cbc8efdee5?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsbW9uJTIwZGlzaHxlbnwwfHwwfHx8MA%3D%3D'
  ],
  'beef': [
    'https://plus.unsplash.com/premium_photo-1723478470990-f0988e3c72fd?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVlZiUyMG1lYWx8ZW58MHx8MHx8fDA%3D'
  ],
  'pork': [
    'https://images.unsplash.com/photo-1698843813577-db28459556b0?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcmslMjBtZWFsfGVufDB8fDB8fHww'
  ],
  'shrimp': [
    'https://images.unsplash.com/photo-1762631934591-8a9bf09e5dfe?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hyaW1wJTIwbWVhbHxlbnwwfHwwfHx8MA%3D%3D'
  ],
  'fish': [
    'https://plus.unsplash.com/premium_photo-1693221705334-dd058bcd0f69?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmlzaCUyMG1lYWx8ZW58MHx8MHx8fDA%3D'
  ],
  
  // Vegetables
  'broccoli': [
    'https://images.unsplash.com/photo-1604908815567-c9727d53f92a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJyb2Njb2xpJTIwbWVhbHxlbnwwfHwwfHx8MA%3D%3D'
  ],
  'spinach': [
    'https://images.unsplash.com/photo-1594782855419-e646186ad78f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaCUyMG1lYWx8ZW58MHx8MHx8fDA%3D'
  ],
  'carrot': [
    'https://plus.unsplash.com/premium_photo-1711139411406-25dcb04c28bc?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2Fycm90JTIwbWVhbHxlbnwwfHwwfHx8MA%3D%3D'
  ],
  'pepper': [
    'https://images.unsplash.com/photo-1762631934518-f75e233413ca?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fwc2ljdW0lMjBtZWFsfGVufDB8fDB8fHww'
  ],
  
  // Starches
  'rice': [
    'https://images.unsplash.com/photo-1625980319455-985e5442c5ae?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmljZSUyMG1lYWx8ZW58MHx8MHx8fDA%3D'
  ],
  'noodle': [
    'https://images.unsplash.com/photo-1602811379794-d37fb6b825cb?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm9vZGxlJTIwbWVhbHxlbnwwfHwwfHx8MA%3D%3D'
  ],
  'bread': [
    'https://plus.unsplash.com/premium_photo-1661770191552-90e12a9c41aa?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJlYWQlMjBtZWFsfGVufDB8fDB8fHww'
  ]
};

// Cache for already-fetched recipe images to prevent redundant API calls
const imageCache = new Map<string, string>();

async function fetchRecipeImage(recipe: Recipe): Promise<string | null> {
  try {
    const recipeName = recipe.name;
    const recipeLower = recipeName.toLowerCase();
    
    // Check cache first
    if (imageCache.has(recipeName)) {
      console.log(`📦 Using cached image for "${recipeName}"`);
      return imageCache.get(recipeName) || null;
    }

    // Step 1: Try keyword matching on recipe name
    const nameMatches = matchKeywords(recipeLower);
    if (nameMatches.length > 0) {
      const selectedImage = selectRandomImage(nameMatches);
      if (selectedImage) {
        imageCache.set(recipeName, selectedImage);
        console.log(`✓ Matched recipe name keywords: "${recipeName}"`);
        return selectedImage;
      }
    }

    // Step 2: Extract ingredients and try matching on those
    const ingredientNames = recipe.ingredients
      .map(ing => ing.item.toLowerCase())
      .join(' ');
    
    const ingredientMatches = matchKeywords(ingredientNames);
    if (ingredientMatches.length > 0) {
      const selectedImage = selectRandomImage(ingredientMatches);
      if (selectedImage) {
        imageCache.set(recipeName, selectedImage);
        console.log(`✓ Matched ingredients for "${recipeName}": ${recipe.ingredients.map(i => i.item).join(', ')}`);
        return selectedImage;
      }
    }

    // Step 3: Fallback - use default image
    const defaultImages = [
      '', // User will fill these in
      ''
    ];
    
    if (defaultImages.some(url => url)) {
      const randomIdx = Math.floor(Math.random() * defaultImages.length);
      const fallbackImage = defaultImages[randomIdx];
      if (fallbackImage) {
        imageCache.set(recipeName, fallbackImage);
        console.log(`⚠️ Using default image for "${recipeName}"`);
        return fallbackImage;
      }
    }

    console.log(`❌ No image available for "${recipeName}"`);
    return null;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

/**
 * Extract keywords from text and return matching image arrays
 */
function matchKeywords(text: string): string[] {
  const matchedImages: string[] = [];
  
  // Define keyword priority - more specific dishes first
  const keywordPriority = [
    'congee', 'stir-fry', 'fried rice', 'curry', 'soup', // Specific dishes
    'grilled', 'sauté', // Cooking methods
    'chicken', 'salmon', 'beef', 'pork', 'shrimp', 'fish', // Proteins
    'broccoli', 'spinach', 'carrot', 'pepper', // Vegetables
    'rice', 'noodle', 'pasta', 'bread', // Starches
    'bowl' // Generic containers
  ];

  // Find matching keywords in priority order
  for (const keyword of keywordPriority) {
    if (text.includes(keyword)) {
      const images = DISH_IMAGES[keyword];
      if (images && images.length > 0) {
        matchedImages.push(...images);
        
        // If we found a specific dish match, prioritize it heavily
        if (['congee', 'curry', 'soup', 'fried rice', 'stir-fry'].includes(keyword)) {
          console.log(`  → Found specific dish match: "${keyword}"`);
          // Return only the specific dish images, don't mix with others
          return images;
        }
      }
    }
  }

  return matchedImages;
}

/**
 * Select a random image from the matched images
 */
function selectRandomImage(images: string[]): string | null {
  const validImages = images.filter(url => url && url.length > 0);
  if (validImages.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * validImages.length);
  return validImages[randomIndex];
}

/**
 * Hook to fetch and attach images to recipes that don't have them yet
 * Supports AI-generated recipes by extracting keywords from ingredients
 */
export function useRecipeImages(recipes: Recipe[], onRecipesUpdate: (recipes: Recipe[]) => void) {
  const processedRecipesRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    if (recipes.length === 0) return;

    // Find recipes that need images (either no imageUrl or the recipe changed)
    const recipesNeedingImages = recipes.filter(r => {
      // If no image, needs one
      if (!r.imageUrl) return true;
      
      // If recipe name changed from what we've seen, needs new image
      const previousImage = processedRecipesRef.current.get(r.name);
      if (previousImage && previousImage !== r.imageUrl) return true;
      
      return false;
    });

    if (recipesNeedingImages.length === 0) return;

    console.log(`📷 Fetching images for ${recipesNeedingImages.length} recipes`);

    // Fetch images for recipes that need them
    (async () => {
      const updatedRecipes = [...recipes];
      let hasChanges = false;
      
      for (const recipe of recipesNeedingImages) {
        const index = updatedRecipes.findIndex(r => r.name === recipe.name && !r.imageUrl);
        if (index !== -1) {
          console.log(`🔍 Fetching image for: ${recipe.name}`);
          // Pass full recipe object, not just name - allows ingredient extraction
          const imageUrl = await fetchRecipeImage(recipe);
          if (imageUrl) {
            console.log(`✅ Successfully got image for ${recipe.name}`);
            updatedRecipes[index] = { ...updatedRecipes[index], imageUrl };
            processedRecipesRef.current.set(recipe.name, imageUrl);
            hasChanges = true;
          } else {
            console.log(`⚠️ No suitable image found for ${recipe.name}`);
            // Don't set a default - leave imageUrl undefined and use gradient fallback
          }
        }
      }

      if (hasChanges) {
        console.log('🎨 Updating recipes with images');
        onRecipesUpdate(updatedRecipes);
      }
    })();
  }, [recipes, onRecipesUpdate]);
}
