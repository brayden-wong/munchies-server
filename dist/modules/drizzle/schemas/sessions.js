"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sessions", {
    enumerable: true,
    get: function() {
        return sessions;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const _users = require("./users");
const sessions = (0, _pgcore.pgTable)("sessions", {
    id: (0, _pgcore.varchar)("id", {
        length: 36
    }).primaryKey(),
    refreshToken: (0, _pgcore.varchar)("refreshToken", {
        length: 255
    }).notNull(),
    expiration: (0, _pgcore.timestamp)("expiration").notNull(),
    userId: (0, _pgcore.varchar)("userId", {
        length: 36
    }).notNull().references(()=>_users.users.id, {
        onDelete: "cascade"
    })
}, (table)=>{
    return {
        tokenIndex: (0, _pgcore.uniqueIndex)("tokenIndex").on(table.refreshToken),
        userIndex: (0, _pgcore.uniqueIndex)("userIndex").on(table.userId)
    };
});

//# sourceMappingURL=sessions.js.map