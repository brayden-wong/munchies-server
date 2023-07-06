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
    recipes: function() {
        return recipes;
    },
    recipeRelations: function() {
        return recipeRelations;
    }
});
const _pgcore = require("drizzle-orm/pg-core");
const _drizzleorm = require("drizzle-orm");
const _usersToRecipes = require("./usersToRecipes");
const _users = require("./users");
const recipes = (0, _pgcore.pgTable)("recipes", {
    id: (0, _pgcore.varchar)("id", {
        length: 36
    }).primaryKey(),
    name: (0, _pgcore.varchar)("name", {
        length: 60
    }).notNull(),
    description: (0, _pgcore.text)("description").notNull(),
    ingredients: (0, _pgcore.json)("ingredients").$type().notNull(),
    steps: (0, _pgcore.json)("steps").$type().notNull(),
    public: (0, _pgcore.boolean)("public").notNull().default(false),
    authorId: (0, _pgcore.varchar)("authorId", {
        length: 36
    }),
    createdAt: (0, _pgcore.timestamp)("createdAt").notNull().defaultNow(),
    updatedAt: (0, _pgcore.timestamp)("updatedAt").notNull().defaultNow()
});
const recipeRelations = (0, _drizzleorm.relations)(recipes, ({ many, one })=>({
        usersToRecipes: many(_usersToRecipes.usersToRecipes),
        users: one(_users.users, {
            fields: [
                recipes.authorId
            ],
            references: [
                _users.users.id
            ]
        })
    }));

//# sourceMappingURL=recipes.js.map