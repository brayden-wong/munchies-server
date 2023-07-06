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
    providers: function() {
        return providers;
    },
    accounts: function() {
        return accounts;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const _users = require("./users");
const providers = (0, _pgcore.pgEnum)("provider", [
    "google",
    "facebook",
    "discord"
]);
const accounts = (0, _pgcore.pgTable)("accounts", {
    id: (0, _pgcore.varchar)("id", {
        length: 36
    }).primaryKey().notNull(),
    provider: providers("provider").notNull(),
    providerId: (0, _pgcore.varchar)("providerId", {
        length: 255
    }).notNull(),
    userId: (0, _pgcore.varchar)("userId", {
        length: 36
    }).notNull().references(()=>_users.users.id, {
        onDelete: "cascade"
    }),
    createdAt: (0, _pgcore.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, _pgcore.timestamp)("updatedAt").defaultNow()
}, (table)=>({
        userId: (0, _pgcore.uniqueIndex)("userIdIndex").on(table.userId),
        providerId: (0, _pgcore.uniqueIndex)("providerIdIndex").on(table.providerId)
    }));

//# sourceMappingURL=accounts.js.map