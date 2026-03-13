import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import z from 'zod';
import zodToJsonSchema from "zod-to-json-schema";

// Loads API key from .env
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`
const ai = new GoogleGenAI({});

interface RecipeRequest {
  ingredients: string[];
}

// Enforces a schema
const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.int()
});

const recipeSchema = z.object({
  'name': z.string(),
  'image': z.string(),
  'description': z.string(),
  'ingredients': z.array(ingredientSchema),
  'instructions': z.string()
});

// responseMimeType enforces a JSON response
export async function generateRecipe(req: RecipeRequest) {
  const prompt = `Using the following list of ingredients, generate a recipe. ${req.ingredients}`

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema: z.toJSONSchema
    }
  });

  // TODO Need to handle errors from Gemini or bad input
}
