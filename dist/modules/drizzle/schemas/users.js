"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    users: function() {
        return users;
    },
    userRelations: function() {
        return userRelations;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const _drizzleorm = require("drizzle-orm");
const _sessions = require("./sessions");
const _accounts = require("./accounts");
const _usersToRecipes = require("./usersToRecipes");
const _usersToRooms = require("./usersToRooms");
const _messages = require("./messages");
const _rooms = require("./rooms");
const users = (0, _pgcore.pgTable)("users", {
    id: (0, _pgcore.varchar)("id", {
        length: 36
    }).primaryKey(),
    name: (0, _pgcore.varchar)("name", {
        length: 60
    }),
    username: (0, _pgcore.varchar)("username", {
        length: 32
    }).notNull(),
    email: (0, _pgcore.varchar)("email", {
        length: 60
    }),
    password: (0, _pgcore.varchar)("password", {
        length: 255
    }),
    deactivate: (0, _pgcore.boolean)("deactivated").notNull().default(false),
    createdAt: (0, _pgcore.timestamp)("createdAt").notNull().defaultNow(),
    updatedAt: (0, _pgcore.timestamp)("updatedAt").notNull().defaultNow(),
    deletedAt: (0, _pgcore.timestamp)("deletedAt").default(null)
}, (table)=>{
    return {
        usernameIndex: (0, _pgcore.uniqueIndex)("usernameIndex").on(table.username),
        emailIndex: (0, _pgcore.uniqueIndex)("emailIndex").on(table.email)
    };
});
const userRelations = (0, _drizzleorm.relations)(users, ({ many, one })=>({
        accounts: one(_accounts.accounts, {
            fields: [
                users.id
            ],
            references: [
                _accounts.accounts.userId
            ]
        }),
        rooms: one(_rooms.rooms, {
            fields: [
                users.id
            ],
            references: [
                _rooms.rooms.creatorId
            ]
        }),
        sessions: one(_sessions.sessions, {
            fields: [
                users.id
            ],
            references: [
                _sessions.sessions.userId
            ]
        }),
        messages: many(_messages.messages),
        usersToRecipes: many(_usersToRecipes.usersToRecipes),
        usersToRooms: many(_usersToRooms.usersToRooms)
    }));

//# sourceMappingURL=users.js.map