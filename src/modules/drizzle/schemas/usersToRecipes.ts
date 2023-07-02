import { relations } from "drizzle-orm";
import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { recipes } from "./recipes";

export const usersToRecipes = pgTable(
  "usersToRecipes",
  {
    userId: varchar("userId", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recipeId: varchar("recipeId", { length: 36 })
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.recipeId),
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
