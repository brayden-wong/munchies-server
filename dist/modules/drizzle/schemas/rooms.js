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
    rooms: function() {
        return rooms;
    },
    roomsRelations: function() {
        return roomsRelations;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const _drizzleorm = require("drizzle-orm");
const _usersToRooms = require("./usersToRooms");
const _messages = require("./messages");
const _users = require("./users");
const rooms = (0, _pgcore.pgTable)("rooms", {
    id: (0, _pgcore.varchar)("id", {
        length: 36
    }).primaryKey(),
    name: (0, _pgcore.varchar)("name", {
        length: 24
    }).notNull(),
    creatorId: (0, _pgcore.varchar)("creatorId", {
        length: 36
    }).notNull().references(()=>_users.users.id, {
        onDelete: "cascade"
    }),
    createdAt: (0, _pgcore.timestamp)("createdAt").notNull().defaultNow(),
    updatedAt: (0, _pgcore.timestamp)("updatedAt").notNull().defaultNow()
}, (table)=>({
        nameIndex: (0, _pgcore.index)("nameIndex").on(table.name)
    }));
const roomsRelations = (0, _drizzleorm.relations)(rooms, ({ many })=>({
        messages: many(_messages.messages),
        usersToRooms: many(_usersToRooms.usersToRooms)
    }));

//# sourceMappingURL=rooms.js.map