import { GoogleGenAI } from "@google/genai";
import z from 'zod';
import dotenv from "dotenv";

// Loads API key from .env
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

interface RecipeRequest {
  ingredients: { name: string, amount: string }[]
}

// Enforces a schema
const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.string()
});

const recipeSchema = z.object({
  'name': z.string(),
  'imageDescription': z.string(),
  'description': z.string(),
  'ingredients': z.array(ingredientSchema),
  'cookTime': z.string(),
  'serves': z.string(),
  'steps': z.array(z.string())
});

const listRecipeSchema = z.array(recipeSchema)

// responseMimeType enforces a JSON response
export async function generateRecipe(req: RecipeRequest) {
  const prompt = `Using the following list of ingredients, generate three unique recipes. ${JSON.stringify(req.ingredients, null, 2)}`

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema: listRecipeSchema.toJSONSchema()
    }
  });

  return JSON.parse(response.text as string);
  // TODO Need to handle errors from Gemini or bad input
}

// EXAMPLE USE
// const res = await generateRecipe({
//   ingredients: [
//     {
//     name: 'carrot',
//     amount: '3'
//     },
//     {
//     name: 'apple',
//     amount: '4'
//     },
//     {
//     name: 'potato',
//     amount: '7'
//     },
//     {
//     name: 'chicken leg',
//     amount: '5'
//     }
//   ]
// });
// console.log(res);
