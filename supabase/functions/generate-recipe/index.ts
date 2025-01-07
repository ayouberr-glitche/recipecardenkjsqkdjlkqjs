import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipeName } = await req.json();
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Generate a recipe for "${recipeName}". Return ONLY a JSON object (no markdown, no backticks) with this exact structure:
    {
      "title": "Recipe name",
      "description": "Brief description",
      "category": "One of: Breakfast, Lunch, Dinner, Dessert, Snack",
      "tags": ["tag1", "tag2"],
      "prepTime": "preparation time in minutes (number only)",
      "cookTime": "cooking time in minutes (number only)",
      "servings": "number of servings (number only)",
      "ingredients": ["ingredient1", "ingredient2"],
      "instructions": ["step1", "step2"],
      "calories": "calories per serving (number only)",
      "protein": "protein in grams (number only)",
      "fiber": "fiber in grams (number only)"
    }`;

    console.log('Sending prompt to Gemini:', prompt);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw response from Gemini:', text);

    // Clean up the response by removing any markdown formatting
    const cleanedText = text.replace(/```json\n|\n```|```/g, '').trim();
    console.log('Cleaned response:', cleanedText);

    try {
      // Parse the cleaned JSON
      const recipe = JSON.parse(cleanedText);

      // Format ingredients and instructions as newline-separated strings
      recipe.ingredients = recipe.ingredients.join('\n');
      recipe.instructions = recipe.instructions.join('\n');

      // Convert numeric strings to actual numbers
      recipe.prepTime = parseInt(recipe.prepTime);
      recipe.cookTime = parseInt(recipe.cookTime);
      recipe.servings = parseInt(recipe.servings);
      recipe.calories = parseInt(recipe.calories);
      recipe.protein = parseInt(recipe.protein);
      recipe.fiber = parseInt(recipe.fiber);

      console.log('Final processed recipe:', recipe);

      return new Response(JSON.stringify(recipe), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.error('Problematic text:', cleanedText);
      throw new Error(`Failed to parse Gemini response: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});