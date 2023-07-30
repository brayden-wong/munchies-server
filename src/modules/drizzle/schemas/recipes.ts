import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersToRecipes } from "./usersToRecipes";
import { users } from "./users";
import { ingredients } from "./ingredients";
import { steps } from "./steps";

export const recipes = pgTable("recipes", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 60 }).notNull(),
  description: text("description").notNull(),

  public: boolean("public").notNull().default(false),
  authorId: varchar("authorId", { length: 36 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const recipeRelations = relations(recipes, ({ many, one }) => ({
  usersToRecipes: many(usersToRecipes),
  users: one(users, {
    fields: [recipes.authorId],
    references: [users.id],
  }),

  ingredients: many(ingredients),
  steps: many(steps),
}));
