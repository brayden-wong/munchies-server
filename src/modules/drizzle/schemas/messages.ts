import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { rooms } from "./rooms";
import { relations } from "drizzle-orm";

export const messages = pgTable("messages", {
  id: varchar("id", { length: 36 }).primaryKey(),
  content: text("content"),

  authorId: varchar("authorId", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  roomId: varchar("roomId", { length: 36 })
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  room: one(rooms, {
    fields: [messages.roomId],
    references: [rooms.id],
  }),
  user: one(users, {
    fields: [messages.authorId],
    references: [users.id],
  }),
}));
