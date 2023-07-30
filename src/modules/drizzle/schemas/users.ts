import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sessions } from "./sessions";
import { accounts } from "./accounts";
import { usersToRecipes } from "./usersToRecipes";
import { usersToRooms } from "./usersToRooms";
import { messages } from "./messages";
import { rooms } from "./rooms";
import { recipes } from "./recipes";
import { friends } from "./friends";

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 60 }),
    username: varchar("username", { length: 32 }).notNull(),
    email: varchar("email", { length: 60 }),
    password: varchar("password", { length: 255 }),

    avatar: text("avatar"),
    active: boolean("active").notNull().default(true),

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
  accounts: one(accounts, {
    fields: [users.id],
    references: [accounts.userId],
  }),
  rooms: one(rooms, {
    fields: [users.id],
    references: [rooms.creatorId],
  }),
  sessions: one(sessions, {
    fields: [users.id],
    references: [sessions.userId],
  }),
  followers: many(friends, { relationName: "followers" }),
  friends: many(friends, { relationName: "friends" }),
  messages: many(messages),
  recipes: many(recipes),
  usersToRecipes: many(usersToRecipes),
  usersToRooms: many(usersToRooms),
}));
