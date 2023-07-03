import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersToRecipes } from "./usersToRecipes";
import { Ingredient, Steps } from "@/modules/recipes";
import { users } from "./users";

export const recipes = pgTable("recipes", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 60 }).notNull(),
  description: text("description").notNull(),
  ingredients: json("ingredients").$type<Array<Ingredient>>().notNull(),
  steps: json("steps").$type<Array<Steps>>().notNull(),

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
}));
