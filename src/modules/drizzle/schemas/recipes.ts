import { json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersToRecipes } from "./usersToRecipes";

export type Ingredient = {
  ingrendientId: number;
  name: string;
  quantity: number;
};
export type Measurements = "tsp" | "tbsp" | "cup" | "oz" | "g" | "mg" | "ml";
export type Steps = Array<{
  stepId: number;
  description: string;
  duration?: number;
  ingredients?: Array<{
    ingredient: Ingredient;
    measurement: Measurements;
  }>;
}>;

export const recipes = pgTable("recipes", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 60 }).notNull(),
  description: text("description").notNull(),
  ingredients: json("ingredients").$type<Array<Ingredient>>().notNull(),
  steps: json("steps").$type<Steps>().notNull(),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const recipeRelations = relations(recipes, ({ many }) => ({
  usersToRecipes: many(usersToRecipes),
}));
