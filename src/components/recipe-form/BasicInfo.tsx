import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoProps {
  title: string;
  image: string;
  description: string;
  category: string;
  tags: string[];
  onChange: (name: string, value: any) => void;
}

export const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Tips and tricks"
];

export const BasicInfo = ({ title, image, description, category, tags, onChange }: BasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Recipe Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={image}
          onChange={(e) => onChange("image", e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          className="mt-1"
          placeholder="Write a short description of your recipe..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={category}
            onValueChange={(value) => onChange("category", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            name="tags"
            value={tags.join(", ")}
            onChange={(e) => onChange("tags", e.target.value.split(",").map(tag => tag.trim()))}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};