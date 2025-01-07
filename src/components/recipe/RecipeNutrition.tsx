import React from "react";
import { adjustValue } from "@/utils/formatters";

interface RecipeNutritionProps {
  calories: string;
  protein: string;
  fiber: string;
  currentServings: number;
  baseServings: number;
}

export const RecipeNutrition = ({ calories, protein, fiber, currentServings, baseServings }: RecipeNutritionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <i className="fas fa-chart-pie text-recipe-primary"></i> Nutrition Information
      </h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-recipe-primary/10 rounded-full flex items-center justify-center mb-3">
            <i className="fas fa-fire-alt text-recipe-primary text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-recipe-primary">
            {adjustValue(calories, currentServings, baseServings)}
          </div>
          <div className="text-sm text-gray-600">Calories</div>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-recipe-primary/10 rounded-full flex items-center justify-center mb-3">
            <i className="fas fa-dumbbell text-recipe-primary text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-recipe-primary">
            {adjustValue(protein, currentServings, baseServings)}
          </div>
          <div className="text-sm text-gray-600">Protein (g)</div>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-recipe-primary/10 rounded-full flex items-center justify-center mb-3">
            <i className="fas fa-seedling text-recipe-primary text-xl"></i>
          </div>
          <div className="text-2xl font-bold text-recipe-primary">
            {adjustValue(fiber, currentServings, baseServings)}
          </div>
          <div className="text-sm text-gray-600">Fiber (g)</div>
        </div>
      </div>
    </div>
  );
};