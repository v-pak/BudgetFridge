import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  RecipeRequest,
  listRecipeSchema
} from './interfaces.ts'

// Loads API key from .env
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// responseMimeType enforces a JSON response
export async function generateRecipe(req: RecipeRequest) {
  // check ingredients list
  if (!req) {
    throw new Error('Empty or missing ingredients array');
  }
  
  const prompt = `Using the following list of ingredients, generate three unique recipes. ${JSON.stringify(req, null, 2)}`

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
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
//   [
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
