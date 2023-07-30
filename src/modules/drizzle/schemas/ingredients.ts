import { relations } from "drizzle-orm";
import { pgTable, primaryKey, smallint, varchar } from "drizzle-orm/pg-core";
import { recipes } from "./recipes";
import { steps } from "./steps";
import { measurements } from "./measurements";

export const ingredients = pgTable(
  "ingredients",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 60 }).notNull(),
    quantity: smallint("quantity").notNull(),
    recipeId: varchar("recipeId", { length: 36 })
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
  },
  (t) => ({
    primaryKey: primaryKey(t.recipeId),
  }),
);

export const ingredientRelations = relations(ingredients, ({ many, one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
  measurements: many(measurements),
  steps: many(steps),
}));
