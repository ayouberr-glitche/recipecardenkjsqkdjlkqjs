import React from "react";

interface RecipeInstructionsProps {
  instructions: string;
}

export const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <i className="fas fa-tasks text-recipe-primary"></i> Instructions
      </h2>
      <ol className="space-y-4">
        {instructions.split("\n").map((instruction, index) => (
          <li key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="flex-shrink-0 w-8 h-8 bg-recipe-primary text-white rounded-full flex items-center justify-center font-semibold">
              {index + 1}
            </span>
            <span>{instruction}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};