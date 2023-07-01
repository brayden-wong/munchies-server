import {
  boolean,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sessions } from "./sessions";
import { accounts } from "./accounts";
import { usersToRecipes } from "./usersToRecipes";

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 60 }),
    username: varchar("username", { length: 32 }).notNull(),
    email: varchar("email", { length: 60 }),
    password: varchar("password", { length: 255 }),

    deactivate: boolean("deactivated").notNull().default(false),

    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    deletedAt: timestamp("deletedAt").default(null),
  },
  (table) => {
    return {
      usernameIndex: uniqueIndex("usernameIndex").on(table.username),
      emailIndex: uniqueIndex("emailIndex").on(table.email),
    };
  },
);

export const userRelations = relations(users, ({ many, one }) => ({
  usersToRecipes: many(usersToRecipes),
  sessionInfo: one(sessions, {
    fields: [users.id],
    references: [sessions.userId],
  }),
  accountsInfo: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
}));
