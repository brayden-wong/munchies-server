import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { users, recipes } from "../";
import { relations } from "drizzle-orm";

export const usersToRecipes = pgTable(
  "usersToRecipes",
  {
    userId: varchar("userId", { length: 36 })
      .notNull()
      .references(() => users.id),
    recipeId: varchar("recipeId", { length: 36 })
      .notNull()
      .references(() => recipes.id),
  },
  (table) => ({
    primaryKey: primaryKey(table.userId, table.recipeId),
  }),
);

export const usersToRecipesRelations = relations(usersToRecipes, ({ one }) => ({
  users: one(users, {
    fields: [usersToRecipes.userId],
    references: [users.id],
  }),
  recipes: one(recipes, {
    fields: [usersToRecipes.recipeId],
    references: [recipes.id],
  }),
}));
