import z from 'zod';

export interface RecipeRequest {
  ingredients: { name: string, amount: string }[]
}

// Enforces a schema
export const ingredientSchema = z.object({
  item: z.string(),
  amount: z.string()
});

export const recipeSchema = z.object({
  'name': z.string(),
  'imageDescription': z.string(),
  'description': z.string(),
  'ingredients': z.array(ingredientSchema),
  'cookTime': z.string(),
  'serves': z.string(),
  'steps': z.array(z.string())
});

export const listRecipeSchema = z.array(recipeSchema)
