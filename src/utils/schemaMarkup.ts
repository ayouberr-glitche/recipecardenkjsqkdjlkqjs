interface SchemaRecipe {
  title: string;
  image: string;
  description: string;
  category: string;
  tags: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string;
  instructions: string;
  calories: string;
  protein: string;
  fiber: string;
}

export const generateSchemaMarkup = (recipe: SchemaRecipe) => {
  const datePublished = new Date().toISOString().split('T')[0];
  
  // Convert minutes to ISO 8601 duration format
  const formatDuration = (minutes: string) => `PT${minutes}M`;
  
  // Split ingredients into array
  const ingredientsList = recipe.ingredients.split('\n').filter(Boolean);
  
  // Format instructions as HowToStep objects
  const instructionSteps = recipe.instructions.split('\n')
    .filter(Boolean)
    .map((step, index) => ({
      "@type": "HowToStep",
      "name": `Step ${index + 1}`,
      "text": step
    }));

  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.title,
    "image": [recipe.image],
    "author": {
      "@type": "Person",
      "name": "Kathryn"
    },
    "datePublished": datePublished,
    "description": recipe.description,
    "prepTime": formatDuration(recipe.prepTime),
    "cookTime": formatDuration(recipe.cookTime),
    "totalTime": formatDuration((parseInt(recipe.prepTime) + parseInt(recipe.cookTime)).toString()),
    "keywords": recipe.tags.join(", "),
    "recipeYield": `${recipe.servings} servings`,
    "recipeCategory": recipe.category,
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.calories} calories`,
      "proteinContent": `${recipe.protein}g`,
      "fiberContent": `${recipe.fiber}g`
    },
    "recipeIngredient": ingredientsList,
    "recipeInstructions": instructionSteps
  };
};