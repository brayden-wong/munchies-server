import { InferModel } from "drizzle-orm";
import { recipes } from "@/modules/drizzle";

export type CreateRecipeDto = InferModel<typeof recipes, "insert">;
export type Recipe = InferModel<typeof recipes, "select">;
export type UpdateRecipeDto = {
  id?: string;
  name?: string;
  description?: string;
  ingredients?: Ingredient | Ingredient[];
  steps?: Steps | Array<Steps>;
};

export type RecipeWithUserId = {
  id: string;
  userId: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  steps: Array<Steps>;
  createdAt: Date;
  updatedAt: Date;
};

export type Ingredient = {
  ingrendientId: number;
  name: string;
  quantity: number;
};

export type Measurements = "tsp" | "tbsp" | "cup" | "oz" | "g" | "mg" | "ml";
export type Steps = {
  stepId: number;
  description: string;
  duration?: number;
  ingredients?: Array<{
    ingredientId: string;
    measurements: {
      quantity: number;
      measurement: Measurements;
    };
  }>;
};

export type TransformRecipeParam = {
  userId: string;
  recipes: {
    id: string;
    name: string;
    description: string;
    ingredients: Array<Ingredient>;
    steps: Array<Steps>;
    createdAt: Date;
    updatedAt: Date;
  };
};
