import React from "react";

interface RecipeHeaderProps {
  title: string;
  image: string;
  category: string;
  tags: string[];
}

export const RecipeHeader = ({ title, image, category, tags }: RecipeHeaderProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <img 
        src={image} 
        alt={title}
        className="w-full h-[400px] object-cover rounded-t-xl"
      />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
        <div className="flex flex-wrap gap-3 text-white/90 text-sm">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <i className="fas fa-utensils mr-2"></i> {category}
          </span>
          {tags.map((tag) => (
            <span key={tag} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};