import {
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const providers = pgEnum("provider", ["google", "facebook", "discord"]);

export const accounts = pgTable(
  "accounts",
  {
    id: varchar("id", { length: 36 }).primaryKey().notNull(),
    provider: providers("provider").notNull(),
    providerId: varchar("providerId", { length: 255 }).notNull(),

    userId: varchar("userId", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => ({
    userId: uniqueIndex("userIdIndex").on(table.userId),
    providerId: uniqueIndex("providerIdIndex").on(table.providerId),
  }),
);

export const accountRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
