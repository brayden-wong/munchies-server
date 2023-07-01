import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  json,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { usersToRecipes } from "./usersToRecipes";

export type Measurements = ["tsb", "tbsp", "cup", "oz"];

export const recipes = pgTable(
  "recipes",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("recipeName", { length: 60 }).notNull(),
    steps: json("steps")
      .$type<
        Array<{
          description: string;
          ingriedient: string;
          amount: number;
          measurement: Measurements;
        }>
      >()
      .notNull(),

    public: boolean("public").notNull().default(false),
    userId: varchar("userId", { length: 36 }).notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    nameIndex: index("nameIndex").on(table.name).asc(),
  }),
);

export const recipesRelations = relations(recipes, ({ many }) => ({
  usersToRecipes: many(usersToRecipes),
}));
