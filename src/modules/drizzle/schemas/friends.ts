import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const friends = pgTable(
  "friends",
  {
    userId: varchar("userId", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    friendId: varchar("friendId", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({
    primaryKey: primaryKey(t.userId, t.friendId),
  }),
);

export const friendsRelations = relations(friends, ({ one }) => ({
  user: one(users, {
    fields: [friends.userId],
    references: [users.id],
  }),
  friend: one(users, {
    fields: [friends.friendId],
    references: [users.id],
  }),
}));
