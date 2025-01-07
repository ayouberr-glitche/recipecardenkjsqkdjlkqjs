import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AIGeneratorProps {
  onRecipeGenerated: (recipe: any) => void;
}

export const AIGenerator = ({ onRecipeGenerated }: AIGeneratorProps) => {
  const [recipeName, setRecipeName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRecipe = async () => {
    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: { recipeName }
      });

      if (error) throw error;
      
      onRecipeGenerated(data);
      toast.success("Recipe generated successfully!");
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="recipeName">Recipe Name</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Enter a recipe name to generate..."
            disabled={isGenerating}
          />
          <Button 
            onClick={generateRecipe}
            disabled={isGenerating}
            className="whitespace-nowrap"
          >
            {isGenerating ? "Generating..." : "Generate Recipe"}
          </Button>
        </div>
      </div>
    </div>
  );
};