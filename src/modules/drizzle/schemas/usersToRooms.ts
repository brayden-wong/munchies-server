import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { rooms } from "./rooms";
import { relations } from "drizzle-orm";

export const usersToRooms = pgTable(
  "usersToRooms",
  {
    userId: varchar("userId", { length: 36 })
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    roomId: varchar("roomId", { length: 36 })
      .notNull()
      .references(() => rooms.id, { onDelete: "cascade" }),
  },
  (table) => ({
    primaryKey: primaryKey(table.userId, table.roomId),
  }),
);

export const usersToRoomsRelations = relations(usersToRooms, ({ one }) => ({
  user: one(users, {
    fields: [usersToRooms.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [usersToRooms.roomId],
    references: [rooms.id],
  }),
}));
