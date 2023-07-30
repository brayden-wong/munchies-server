import { pgEnum, pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { steps } from "./steps";
import { ingredients } from "./ingredients";
import { relations } from "drizzle-orm";

export const measurementsEnum = pgEnum("measuremnts", [
  "tsp",
  "tbsp",
  "cup",
  "oz",
  "g",
  "mg",
  "ml",
]);

export const measurements = pgTable("measurements", {
  measurement: measurementsEnum("measurement").notNull(),
  quantity: smallint("quantity").notNull(),

  ingredientId: varchar("ingredientId", { length: 36 })
    .notNull()
    .references(() => ingredients.id, { onDelete: "cascade" }),
  stepId: varchar("stepId", { length: 36 })
    .notNull()
    .references(() => steps.id, { onDelete: "cascade" }),
});

export const measurementsRelations = relations(measurements, ({ one }) => ({
  ingredient: one(ingredients, {
    fields: [measurements.ingredientId],
    references: [ingredients.id],
  }),
  step: one(steps, {
    fields: [measurements.stepId],
    references: [steps.id],
  }),
}));
