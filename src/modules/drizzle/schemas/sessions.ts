import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { cuid } from "@/utils";

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(cuid()),
    refreshToken: varchar("refreshToken", { length: 255 }).notNull(),
    expiration: timestamp("expiration").notNull(),
    userId: varchar("userId", { length: 36 })
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      tokenIndex: uniqueIndex("tokenIndex").on(table.refreshToken),
      userIndex: uniqueIndex("userIndex").on(table.userId),
    };
  },
);
