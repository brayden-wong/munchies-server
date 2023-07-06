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
    usersToRooms: function() {
        return usersToRooms;
    },
    usersToRoomsRelations: function() {
        return usersToRoomsRelations;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const _users = require("./users");
const _rooms = require("./rooms");
const _drizzleorm = require("drizzle-orm");
const usersToRooms = (0, _pgcore.pgTable)("usersToRooms", {
    userId: (0, _pgcore.varchar)("userId", {
        length: 36
    }).notNull().references(()=>_users.users.id, {
        onDelete: "cascade"
    }),
    roomId: (0, _pgcore.varchar)("roomId", {
        length: 36
    }).notNull().references(()=>_rooms.rooms.id, {
        onDelete: "cascade"
    })
}, (table)=>({
        primaryKey: (0, _pgcore.primaryKey)(table.userId, table.roomId)
    }));
const usersToRoomsRelations = (0, _drizzleorm.relations)(usersToRooms, ({ one })=>({
        user: one(_users.users, {
            fields: [
                usersToRooms.userId
            ],
            references: [
                _users.users.id
            ]
        }),
        room: one(_rooms.rooms, {
            fields: [
                usersToRooms.roomId
            ],
            references: [
                _rooms.rooms.id
            ]
        })
    }));

//# sourceMappingURL=usersToRooms.js.map