import React from "react";
import { RecipeForm } from "@/components/RecipeForm";
import { RecipeCard } from "@/components/RecipeCard";

const Index = () => {
  const [recipe, setRecipe] = React.useState({
    title: "High-Protein Greek Yogurt Parfait",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    description: "A delicious and healthy breakfast parfait packed with protein and fresh berries.",
    category: "Breakfast",
    tags: ["Healthy", "Quick"],
    prepTime: "5",
    cookTime: "0",
    servings: "1",
    ingredients: "1 cup Greek yogurt\n1/2 cup mixed berries\n2 tablespoons granola\n1 tablespoon chia seeds\n1 teaspoon honey",
    instructions: "Layer half of the Greek yogurt\nAdd mixed berries\nSprinkle granola and chia seeds\nRepeat layers\nServe immediately",
    calories: "350",
    protein: "30",
    fiber: "7"
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe Card Generator</h1>
          <p className="text-lg text-gray-600">Create beautiful, shareable recipe cards in seconds</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Recipe Details</h2>
            <RecipeForm onUpdateRecipe={setRecipe} />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Preview</h2>
            <RecipeCard recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;