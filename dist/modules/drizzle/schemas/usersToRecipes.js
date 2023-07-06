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
    usersToRecipes: function() {
        return usersToRecipes;
    },
    usersToRecipesRelations: function() {
        return usersToRecipesRelations;
    }
});
const _drizzleorm = require("drizzle-orm");
const _pgcore = require("drizzle-orm/pg-core");
const _users = require("./users");
const _recipes = require("./recipes");
const usersToRecipes = (0, _pgcore.pgTable)("usersToRecipes", {
    userId: (0, _pgcore.varchar)("userId", {
        length: 36
    }).notNull().references(()=>_users.users.id, {
        onDelete: "cascade"
    }),
    recipeId: (0, _pgcore.varchar)("recipeId", {
        length: 36
    }).notNull().references(()=>_recipes.recipes.id, {
        onDelete: "cascade"
    })
}, (table)=>({
        pk: (0, _pgcore.primaryKey)(table.userId, table.recipeId),
        indexes: (0, _pgcore.index)("idIndex").on(table.userId, table.recipeId)
    }));
const usersToRecipesRelations = (0, _drizzleorm.relations)(usersToRecipes, ({ one })=>({
        users: one(_users.users, {
            fields: [
                usersToRecipes.userId
            ],
            references: [
                _users.users.id
            ]
        }),
        recipes: one(_recipes.recipes, {
            fields: [
                usersToRecipes.recipeId
            ],
            references: [
                _recipes.recipes.id
            ]
        })
    }));

//# sourceMappingURL=usersToRecipes.js.map