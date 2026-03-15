import { useState, useCallback, type ReactNode } from 'react';
import type { FridgeItem, Recipe } from '../utils/types';
import { loadFridgeItems, saveFridgeItems } from '../utils/storage';
import { RecipeContext } from './RecipeContext';

// const DEV_RECIPES: Recipe[] = [
//   {
//     name: 'Garlic Soy Chicken Bowl',
//     imageDescription: 'glazed chicken thighs over jasmine rice with broccoli',
//     description:
//       'Tender chicken thighs glazed in a rich garlic-soy reduction, served over fluffy jasmine rice with crisp blanched broccoli.',
//     ingredients: [
//       { item: 'Chicken thighs, diced', amount: '500g' },
//       { item: 'Jasmine rice', amount: '2 cups' },
//       { item: 'Broccoli florets', amount: '1 head' },
//       { item: 'Soy sauce', amount: '3 tbsp' },
//       { item: 'Garlic, minced', amount: '4 cloves' },
//       { item: 'Sesame oil', amount: '1 tbsp' },
//     ],
//     cookTime: '35 min',
//     serves: '2',
//     steps: [
//       'Rinse jasmine rice and cook according to package directions. Set aside and keep warm.',
//       'Heat sesame oil in a large skillet over medium-high heat. Season chicken with salt and pepper, then sear for 4–5 minutes per side.',
//       'Add minced garlic to the pan and cook for 30 seconds until fragrant. Pour in soy sauce and let it reduce into a sticky glaze.',
//       'Blanch broccoli florets in salted boiling water for 2 minutes. Drain and set aside.',
//       'Serve glazed chicken over jasmine rice with broccoli on the side. Drizzle remaining sauce from the pan.',
//     ],
//   },
//   {
//     name: 'Sesame Broccoli Stir-Fry',
//     imageDescription: 'broccoli stir-fry with sesame seeds in a wok',
//     description:
//       'A quick and flavourful stir-fry that lets crisp broccoli shine in a savory sesame-soy sauce.',
//     ingredients: [
//       { item: 'Broccoli, cut into florets', amount: '2 heads' },
//       { item: 'Garlic, sliced', amount: '3 cloves' },
//       { item: 'Soy sauce', amount: '2 tbsp' },
//       { item: 'Sesame oil', amount: '2 tsp' },
//       { item: 'Sesame seeds', amount: '1 tbsp' },
//     ],
//     cookTime: '20 min',
//     serves: '2',
//     steps: [
//       'Heat a wok or large skillet over high heat until smoking.',
//       'Add sesame oil and garlic; stir-fry for 20 seconds.',
//       'Add broccoli and stir-fry for 3–4 minutes until bright green and just tender.',
//       'Pour in soy sauce and toss to coat. Cook 1 more minute.',
//       'Serve immediately, topped with sesame seeds.',
//     ],
//   },
//   {
//     name: 'Chicken Fried Rice',
//     imageDescription: 'golden fried rice with chicken and vegetables in a wok',
//     description:
//       'Classic fried rice loaded with tender chicken and tossed in a smoky, umami-rich soy sauce.',
//     ingredients: [
//       { item: 'Cooked jasmine rice (day-old)', amount: '3 cups' },
//       { item: 'Chicken thighs, diced', amount: '300g' },
//       { item: 'Garlic, minced', amount: '3 cloves' },
//       { item: 'Soy sauce', amount: '3 tbsp' },
//       { item: 'Sesame oil', amount: '1 tsp' },
//       { item: 'Eggs', amount: '2' },
//     ],
//     cookTime: '25 min',
//     serves: '3',
//     steps: [
//       'Season diced chicken with soy sauce and set aside for 10 minutes.',
//       'Heat oil in a wok over high heat. Cook chicken until golden, about 5 minutes. Remove and set aside.',
//       'Add garlic to the wok; fry 30 seconds. Push to one side, scramble eggs on the other.',
//       'Add cold rice and break up any clumps. Stir-fry for 3–4 minutes.',
//       'Return chicken, add remaining soy sauce and sesame oil. Toss everything together and serve.',
//     ],
//   },
//   {
//     name: 'Garlic Rice Congee',
//     imageDescription: 'creamy white rice congee with garlic oil drizzle',
//     description:
//       'A comforting, silky congee simmered low and slow, finished with fragrant garlic oil.',
//     ingredients: [
//       { item: 'Jasmine rice', amount: '½ cup' },
//       { item: 'Garlic, thinly sliced', amount: '5 cloves' },
//       { item: 'Sesame oil', amount: '1 tbsp' },
//       { item: 'Soy sauce', amount: '1 tbsp' },
//       { item: 'Water or stock', amount: '6 cups' },
//     ],
//     cookTime: '45 min',
//     serves: '2',
//     steps: [
//       'Combine rice and water in a pot. Bring to a boil, then reduce to a low simmer.',
//       'Cook uncovered for 35–40 minutes, stirring occasionally, until the rice breaks down to a creamy porridge.',
//       'Meanwhile, fry garlic slices in sesame oil over low heat until golden and crispy.',
//       'Season congee with soy sauce and salt to taste.',
//       'Ladle into bowls and top with crispy garlic and a drizzle of the fragrant oil.',
//     ],
//   },
//   {
//     name: 'Soy-Glazed Broccoli & Rice',
//     imageDescription: 'roasted broccoli over steamed rice with soy glaze',
//     description:
//       'Oven-roasted broccoli develops irresistible caramelised edges, served over steamed rice with a punchy soy glaze.',
//     ingredients: [
//       { item: 'Broccoli, large florets', amount: '1 head' },
//       { item: 'Jasmine rice', amount: '1½ cups' },
//       { item: 'Soy sauce', amount: '2 tbsp' },
//       { item: 'Garlic, minced', amount: '2 cloves' },
//       { item: 'Sesame oil', amount: '1 tbsp' },
//     ],
//     cookTime: '30 min',
//     serves: '2',
//     steps: [
//       'Preheat oven to 220 °C (425 °F). Cook rice according to package directions.',
//       'Toss broccoli with sesame oil and a pinch of salt. Spread on a baking tray.',
//       'Roast for 18–20 minutes until edges are charred and crispy.',
//       'Mix soy sauce and garlic in a small bowl to make the glaze.',
//       'Serve roasted broccoli over rice, drizzled generously with the soy-garlic glaze.',
//     ],
//   },
// ];

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [ingredients, setIngredientsState] = useState<FridgeItem[]>(loadFridgeItems);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const setIngredients = useCallback((items: FridgeItem[]) => {
    setIngredientsState(items);
    saveFridgeItems(items);
  }, []);

  const addIngredient = useCallback((item: FridgeItem) => {
    setIngredientsState((prev) => {
      const next = [...prev, item];
      saveFridgeItems(next);
      return next;
    });
  }, []);

  const removeIngredient = useCallback((index: number) => {
    setIngredientsState((prev) => {
      const next = prev.filter((_, i) => i !== index);
      saveFridgeItems(next);
      return next;
    });
  }, []);

  const nextRecipe = useCallback(() => {
    setCurrentRecipeIndex((prev) =>
      recipes.length > 0 ? (prev + 1) % recipes.length : 0,
    );
  }, [recipes.length]);

  const reset = useCallback(() => {
    setRecipes([]);
    setCurrentRecipeIndex(0);
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        ingredients,
        setIngredients,
        addIngredient,
        removeIngredient,
        recipes,
        setRecipes,
        currentRecipeIndex,
        setCurrentRecipeIndex,
        nextRecipe,
        reset,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
