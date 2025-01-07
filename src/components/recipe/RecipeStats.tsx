import React from "react";
import { Input } from "@/components/ui/input";

interface RecipeStatsProps {
  prepTime: string;
  cookTime: string;
  currentServings: number;
  setCurrentServings: (servings: number) => void;
}

const formatTime = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}min`;
};

export const RecipeStats = ({ prepTime, cookTime, currentServings, setCurrentServings }: RecipeStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-12 h-12 bg-recipe-primary/10 rounded-full flex items-center justify-center">
          <i className="fas fa-clock text-recipe-primary text-xl"></i>
        </div>
        <div className="font-semibold">{formatTime(parseInt(prepTime))}</div>
        <div className="text-sm text-gray-600">Prep Time</div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-12 h-12 bg-recipe-primary/10 rounded-full flex items-center justify-center">
          <i className="fas fa-fire text-recipe-primary text-xl"></i>
        </div>
        <div className="font-semibold">{formatTime(parseInt(cookTime))}</div>
        <div className="text-sm text-gray-600">Cook Time</div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-12 h-12 bg-recipe-primary/10 rounded-full flex items-center justify-center">
          <i className="fas fa-users text-recipe-primary text-xl"></i>
        </div>
        <div className="font-semibold">
          <Input
            type="number"
            min="1"
            value={currentServings}
            onChange={(e) => setCurrentServings(parseInt(e.target.value) || 1)}
            className="w-20 text-center"
          />
        </div>
        <div className="text-sm text-gray-600">Servings</div>
      </div>
    </div>
  );
};