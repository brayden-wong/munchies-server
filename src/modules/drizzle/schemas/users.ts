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

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 60 }),
    username: varchar("username", { length: 32 }).notNull(),
    email: varchar("email", { length: 60 }),
    password: varchar("password", { length: 255 }),

    deactivate: boolean("deactivated").notNull().default(false),

    accountId: varchar("accountId", { length: 36 }),
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

export const userRelations = relations(users, ({ one }) => ({
  sessionsUserId: one(sessions, {
    fields: [users.id],
    references: [sessions.userId],
  }),
  accountsUserId: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
}));
