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
    messages: function() {
        return messages;
    },
    messagesRelations: function() {
        return messagesRelations;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const _users = require("./users");
const _rooms = require("./rooms");
const _drizzleorm = require("drizzle-orm");
const messages = (0, _pgcore.pgTable)("messages", {
    id: (0, _pgcore.varchar)("id", {
        length: 36
    }).primaryKey(),
    content: (0, _pgcore.text)("content"),
    authorId: (0, _pgcore.varchar)("authorId", {
        length: 36
    }).notNull().references(()=>_users.users.id, {
        onDelete: "cascade"
    }),
    roomId: (0, _pgcore.varchar)("roomId", {
        length: 36
    }).notNull().references(()=>_rooms.rooms.id, {
        onDelete: "cascade"
    }),
    createdAt: (0, _pgcore.timestamp)("createdAt").notNull().defaultNow()
});
const messagesRelations = (0, _drizzleorm.relations)(messages, ({ one })=>({
        room: one(_rooms.rooms, {
            fields: [
                messages.roomId
            ],
            references: [
                _rooms.rooms.id
            ]
        }),
        user: one(_users.users, {
            fields: [
                messages.authorId
            ],
            references: [
                _users.users.id
            ]
        })
    }));

//# sourceMappingURL=messages.js.map