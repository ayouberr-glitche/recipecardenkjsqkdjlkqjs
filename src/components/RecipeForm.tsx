import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BasicInfo } from "./recipe-form/BasicInfo";
import { AIGenerator } from "./recipe-form/AIGenerator";

interface RecipeFormProps {
  onUpdateRecipe: (recipe: any) => void;
}

export const RecipeForm = ({ onUpdateRecipe }: RecipeFormProps) => {
  const [recipeData, setRecipeData] = useState({
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

  const handleChange = (name: string, value: any) => {
    setRecipeData(prev => ({
      ...prev,
      [name]: value
    }));
    onUpdateRecipe({
      ...recipeData,
      [name]: value
    });
  };

  const handleAIGenerated = (recipe: any) => {
    setRecipeData(recipe);
    onUpdateRecipe(recipe);
  };

  return (
    <Tabs defaultValue="manual" className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        <TabsTrigger value="ai">AI Generator</TabsTrigger>
      </TabsList>
      
      <TabsContent value="manual" className="space-y-6">
        <BasicInfo
          title={recipeData.title}
          image={recipeData.image}
          description={recipeData.description}
          category={recipeData.category}
          tags={recipeData.tags}
          onChange={handleChange}
        />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="prepTime">Prep Time (min)</Label>
            <Input
              id="prepTime"
              name="prepTime"
              type="number"
              value={recipeData.prepTime}
              onChange={(e) => handleChange("prepTime", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cookTime">Cook Time (min)</Label>
            <Input
              id="cookTime"
              name="cookTime"
              type="number"
              value={recipeData.cookTime}
              onChange={(e) => handleChange("cookTime", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="servings">Servings</Label>
            <Input
              id="servings"
              name="servings"
              type="number"
              value={recipeData.servings}
              onChange={(e) => handleChange("servings", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="ingredients">Ingredients (one per line)</Label>
          <Textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={(e) => handleChange("ingredients", e.target.value)}
            className="mt-1 h-32"
          />
        </div>

        <div>
          <Label htmlFor="instructions">Instructions (one per line)</Label>
          <Textarea
            id="instructions"
            name="instructions"
            value={recipeData.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
            className="mt-1 h-32"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="calories">Calories</Label>
            <Input
              id="calories"
              name="calories"
              type="number"
              value={recipeData.calories}
              onChange={(e) => handleChange("calories", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              name="protein"
              type="number"
              value={recipeData.protein}
              onChange={(e) => handleChange("protein", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="fiber">Fiber (g)</Label>
            <Input
              id="fiber"
              name="fiber"
              type="number"
              value={recipeData.fiber}
              onChange={(e) => handleChange("fiber", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="ai">
        <AIGenerator onRecipeGenerated={handleAIGenerated} />
      </TabsContent>
    </Tabs>
  );
};