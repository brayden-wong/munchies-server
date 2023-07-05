import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usersToRooms } from "./usersToRooms";
import { messages } from "./messages";
import { users } from "./users";

export const rooms = pgTable(
  "rooms",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 24 }).notNull(),

    creatorId: varchar("creatorId", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    nameIndex: index("nameIndex").on(table.name),
  }),
);

export const roomsRelations = relations(rooms, ({ many }) => ({
  messages: many(messages),
  usersToRooms: many(usersToRooms),
}));
