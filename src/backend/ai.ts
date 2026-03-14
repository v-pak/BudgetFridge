import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import z from 'zod';
import zodToJsonSchema from "zod-to-json-schema";

// Loads API key from .env
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`
const ai = new GoogleGenAI({});

interface RecipeRequest {
  ingredients: { name: string, amount: string }[]
}

// Enforces a schema
const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.int()
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

// responseMimeType enforces a JSON response
export async function generateRecipe(req: RecipeRequest) {
  const prompt = `Using the following list of ingredients, generate a recipe. ${JSON.stringify(req.ingredients, null, 2)}`

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema: recipeSchema.toJSONSchema()
    }
  });

  console.log(JSON.parse(response.text as string));
  // TODO Need to handle errors from Gemini or bad input
}

// EXAMPLE USE
// generateRecipe({
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
