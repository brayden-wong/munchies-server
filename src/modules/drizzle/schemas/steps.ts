import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { recipes } from "./recipes";
import { ingredients } from "./ingredients";
import { measurements } from "./measurements";

export const timeEnum = pgEnum("timeEnum", ["seconds", "minutes", "hours"]);

export const steps = pgTable("steps", {
  id: varchar("id", { length: 36 }).primaryKey(),
  description: text("description").notNull(),
  timeType: timeEnum("timeType").default("minutes"),
  duration: integer("duration"),

  recipeId: varchar("recipeId", { length: 36 })
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const stepsRelations = relations(steps, ({ many, one }) => ({
  recipe: one(recipes, {
    fields: [steps.id],
    references: [recipes.id],
  }),
  ingredients: many(ingredients),
  measurements: many(measurements),
}));
