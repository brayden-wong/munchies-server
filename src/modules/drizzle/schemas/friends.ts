import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

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
    relationName: "followers",
    fields: [friends.userId],
    references: [users.id],
  }),
  friend: one(users, {
    relationName: "friends",
    fields: [friends.friendId],
    references: [users.id],
  }),
}));
