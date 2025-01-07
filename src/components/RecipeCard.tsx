import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RecipeHeader } from "./recipe/RecipeHeader";
import { RecipeStats } from "./recipe/RecipeStats";
import { RecipeIngredients } from "./recipe/RecipeIngredients";
import { RecipeInstructions } from "./recipe/RecipeInstructions";
import { RecipeNutrition } from "./recipe/RecipeNutrition";
import { generateSchemaMarkup } from "@/utils/schemaMarkup";
import { formatTime, formatAmount } from "@/utils/formatters";

interface RecipeCardProps {
  recipe: {
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
  };
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [currentServings, setCurrentServings] = useState(parseInt(recipe.servings));

  const generateHTML = () => {
    const schemaMarkup = generateSchemaMarkup(recipe);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${recipe.title}</title>
    <script type="application/ld+json">
    ${JSON.stringify(schemaMarkup, null, 2)}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }
        
        body {
            background-color: #f5f5f5;
            padding: 2rem;
        }
        
        .recipe-card {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .relative {
            position: relative;
        }
        
        .recipe-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        
        .recipe-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
            padding: 2rem;
        }
        
        .recipe-title {
            color: white;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        
        .recipe-meta {
            display: flex;
            gap: 1rem;
            color: rgba(255,255,255,0.9);
            font-size: 0.875rem;
        }
        
        .recipe-content {
            padding: 2rem;
        }
        
        .recipe-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .stat {
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 0.75rem;
            text-align: center;
        }
        
        .stat i {
            color: #10b981;
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
        }
        
        .stat-value {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0.5rem 0;
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: #64748b;
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 2rem 0 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .section-title i {
            color: #10b981;
        }
        
        .ingredients-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 2rem;
        }
        
        .ingredient-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 0.5rem;
        }
        
        .ingredient-amount {
            font-weight: 600;
            color: #10b981;
            width: 4rem;
        }
        
        .instructions-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
            counter-reset: step;
            list-style: none;
        }
        
        .instruction-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 0.5rem;
        }
        
        .instruction-number {
            width: 2rem;
            height: 2rem;
            background-color: #10b981;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-top: 1rem;
        }
        
        .nutrition-item {
            background-color: #f8f9fa;
            padding: 1.5rem;
            border-radius: 0.75rem;
            text-align: center;
        }
        
        .nutrition-item i {
            color: #10b981;
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
        }
        
        .nutrition-value {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0.5rem 0;
        }
        
        .nutrition-label {
            font-size: 0.875rem;
            color: #64748b;
        }
        
        #servings {
            width: 80px;
            padding: 0.5rem;
            text-align: center;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            font-size: 1rem;
        }
    </style>
    <script>
        function formatAmount(amountStr, currentServings, baseServings) {
            if (!amountStr || amountStr.trim() === '') return '';

            if (amountStr.includes('/')) {
                const [numerator, denominator] = amountStr.split('/').map(num => parseFloat(num.trim()));
                if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                    const decimal = (numerator / denominator) * (currentServings / baseServings);
                    if (Number.isInteger(decimal)) {
                        return decimal.toString();
                    }
                    const gcd = (a, b) => b ? gcd(b, a % b) : a;
                    const factor = currentServings / baseServings;
                    const newNumerator = numerator * factor;
                    const newDenominator = denominator;
                    const divisor = gcd(Math.round(newNumerator * 1000), Math.round(newDenominator * 1000));
                    return \`\${Math.round(newNumerator * 1000 / divisor) / 1000}/\${Math.round(newDenominator * 1000 / divisor) / 1000}\`;
                }
            }

            const amount = parseFloat(amountStr);
            if (!isNaN(amount)) {
                const adjusted = amount * (currentServings / baseServings);
                return Number.isInteger(adjusted) ? adjusted.toString() : adjusted.toFixed(1);
            }

            return amountStr;
        }

        function formatTime(minutes) {
            if (minutes < 60) return \`\${minutes} min\`;
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return \`\${hours}h \${remainingMinutes}min\`;
        }
    </script>
</head>
<body>
    <div class="recipe-card">
        <div class="relative">
            <img class="recipe-image" src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-overlay">
                <h1 class="recipe-title">${recipe.title}</h1>
                <div class="recipe-meta">
                    <span><i class="fas fa-utensils"></i> ${recipe.category}</span>
                    ${recipe.tags.map(tag => `
                        <span>•</span>
                        <span>${tag}</span>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="recipe-content">
            <p class="text-gray-600 mb-6">${recipe.description}</p>
            
            <div class="recipe-stats">
                <div class="stat">
                    <i class="fas fa-clock"></i>
                    <div class="stat-value">${formatTime(parseInt(recipe.prepTime))}</div>
                    <div class="stat-label">Prep Time</div>
                </div>
                <div class="stat">
                    <i class="fas fa-fire"></i>
                    <div class="stat-value">${formatTime(parseInt(recipe.cookTime))}</div>
                    <div class="stat-label">Cook Time</div>
                </div>
                <div class="stat">
                    <i class="fas fa-users"></i>
                    <div class="stat-value">
                        <input type="number" id="servings" value="${currentServings}" min="1">
                    </div>
                    <div class="stat-label">Servings</div>
                </div>
            </div>

            <h2 class="section-title"><i class="fas fa-list"></i> Ingredients</h2>
            <div class="ingredients-list">
                ${recipe.ingredients.split('\n').map((ingredient, index) => {
                    const [amount, ...rest] = ingredient.split(' ');
                    return `
                        <div class="ingredient-item" data-base-amount="${amount}">
                            <span class="ingredient-amount">${formatAmount(amount, currentServings, parseInt(recipe.servings))}</span>
                            <span>${rest.join(' ')}</span>
                        </div>
                    `;
                }).join('')}
            </div>

            <h2 class="section-title"><i class="fas fa-tasks"></i> Instructions</h2>
            <ol class="instructions-list">
                ${recipe.instructions.split('\n').map((instruction, index) => `
                    <li class="instruction-item">
                        <span class="instruction-number">${index + 1}</span>
                        <span>${instruction}</span>
                    </li>
                `).join('')}
            </ol>

            <div class="nutrition">
                <h2 class="section-title"><i class="fas fa-chart-pie"></i> Nutrition Information</h2>
                <div class="nutrition-grid">
                    <div class="nutrition-item">
                        <i class="fas fa-fire-alt"></i>
                        <div class="nutrition-value" data-base-value="${recipe.calories}">${recipe.calories}</div>
                        <div class="nutrition-label">Calories</div>
                    </div>
                    <div class="nutrition-item">
                        <i class="fas fa-dumbbell"></i>
                        <div class="nutrition-value" data-base-value="${recipe.protein}">${recipe.protein}</div>
                        <div class="nutrition-label">Protein (g)</div>
                    </div>
                    <div class="nutrition-item">
                        <i class="fas fa-seedling"></i>
                        <div class="nutrition-value" data-base-value="${recipe.fiber}">${recipe.fiber}</div>
                        <div class="nutrition-label">Fiber (g)</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('servings').addEventListener('input', function() {
            const newServings = parseFloat(this.value) || 1;
            const baseServings = ${parseInt(recipe.servings)};
            const ratio = newServings / baseServings;

            // Update ingredients
            document.querySelectorAll('.ingredient-item').forEach(item => {
                const baseAmount = item.getAttribute('data-base-amount');
                const newAmount = formatAmount(baseAmount * ratio, newServings, baseServings);
                item.querySelector('.ingredient-amount').textContent = newAmount;
            });

            // Update nutrition values
            document.querySelectorAll('.nutrition-value').forEach(div => {
                const baseValue = parseFloat(div.getAttribute('data-base-value'));
                const newValue = Math.round(baseValue * ratio);
                div.textContent = newValue;
            });
        });
    </script>
</body>
</html>`;
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(generateHTML());
    toast.success("Recipe HTML copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <RecipeHeader 
        title={recipe.title}
        image={recipe.image}
        category={recipe.category}
        tags={recipe.tags}
      />

      <div className="p-6 space-y-8">
        <p className="text-gray-600">{recipe.description}</p>
        
        <RecipeStats 
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          currentServings={currentServings}
          setCurrentServings={setCurrentServings}
        />

        <RecipeIngredients 
          ingredients={recipe.ingredients}
          currentServings={currentServings}
          baseServings={parseInt(recipe.servings)}
        />

        <RecipeInstructions 
          instructions={recipe.instructions}
        />

        <RecipeNutrition 
          calories={recipe.calories}
          protein={recipe.protein}
          fiber={recipe.fiber}
          currentServings={currentServings}
          baseServings={parseInt(recipe.servings)}
        />

        <Button 
          onClick={copyHTML}
          className="w-full bg-recipe-primary hover:bg-recipe-primary/90 text-white"
        >
          <i className="fas fa-copy mr-2"></i> Copy Recipe HTML
        </Button>
      </div>
    </div>
  );
};
