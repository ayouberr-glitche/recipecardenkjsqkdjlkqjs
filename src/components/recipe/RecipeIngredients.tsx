import React from "react";

interface RecipeIngredientsProps {
  ingredients: string;
  currentServings: number;
  baseServings: number;
}

export const RecipeIngredients = ({ ingredients, currentServings, baseServings }: RecipeIngredientsProps) => {
  const formatAmount = (amountStr: string): string => {
    if (!amountStr || amountStr.trim() === '') return '';

    // Handle fractions (e.g., "1/2")
    if (amountStr.includes('/')) {
      const [numerator, denominator] = amountStr.split('/').map(num => parseFloat(num.trim()));
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        const decimal = (numerator / denominator) * (currentServings / baseServings);
        if (Number.isInteger(decimal)) {
          return decimal.toString();
        }
        // Return as a fraction
        const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
        const factor = currentServings / baseServings;
        const newNumerator = numerator * factor;
        const newDenominator = denominator;
        const divisor = gcd(Math.round(newNumerator * 1000), Math.round(newDenominator * 1000));
        return `${Math.round(newNumerator * 1000 / divisor) / 1000}/${Math.round(newDenominator * 1000 / divisor) / 1000}`;
      }
    }

    // For regular numbers
    const amount = parseFloat(amountStr);
    if (!isNaN(amount)) {
      const adjusted = amount * (currentServings / baseServings);
      return Number.isInteger(adjusted) ? adjusted.toString() : adjusted.toFixed(1);
    }

    return amountStr;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <i className="fas fa-list text-recipe-primary"></i> Ingredients
      </h2>
      <ul className="space-y-3">
        {ingredients.split("\n").map((ingredient, index) => {
          const [amount, ...rest] = ingredient.split(" ");
          const adjustedAmount = formatAmount(amount);
          return (
            <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="w-16 text-recipe-primary font-semibold">{adjustedAmount}</span>
              <span>{rest.join(" ")}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};