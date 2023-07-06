"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RecipesController", {
    enumerable: true,
    get: function() {
        return RecipesController;
    }
});
const _constants = require("../../utils/constants");
const _decorators = require("../../utils/decorators");
const _common = require("@nestjs/common");
const _recipesservice = require("./recipes.service");
const _recipestypes = require("./recipes.types");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let RecipesController = class RecipesController {
    async createRecipe(userId, createRecipeDto) {
        const recipe = await this.recipesService.createRecipe(userId, createRecipeDto);
        return {
            status: "ok",
            statusCode: 201,
            data: recipe
        };
    }
    async getRecipe(recipeId, userId) {
        const recipe = await this.recipesService.getLinkedRecipe(recipeId, userId);
        return {
            status: "ok",
            statusCode: 200,
            data: recipe
        };
    }
    async getRecipes(userId) {
        const recipes = await this.recipesService.getRecipes(userId);
        return {
            status: "ok",
            statusCode: 200,
            data: recipes
        };
    }
    async updateRecipe(updateRecipeDto, userId) {
        const updatedRecipe = await this.recipesService.updateRecipe(userId, updateRecipeDto);
        return {
            status: "ok",
            statusCode: 200,
            data: updatedRecipe
        };
    }
    async makeRecipePublic(recipeId, userId) {
        const recipe = await this.recipesService.makeRecipePublic(recipeId, userId);
        return {
            status: "ok",
            statusCode: 200,
            data: recipe
        };
    }
    async makeRecipePrivate(recipeId, userId) {
        const recipe = await this.recipesService.makeRecipePrivate(recipeId, userId);
        return {
            status: "ok",
            statusCode: 200,
            data: recipe
        };
    }
    async saveRecipe(recipeId, userId) {}
    async removeRecipe(recipeId, userId) {}
    async deleteRecipe(userId, recipeId) {
        const result = await this.recipesService.deleteRecipe(recipeId, userId);
        return {
            status: "ok",
            statusCode: 200,
            data: {
                status: "deleted",
                recipe: result
            }
        };
    }
    constructor(recipesService){
        _define_property(this, "recipesService", void 0);
        this.recipesService = recipesService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _decorators.UserId)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _recipestypes.CreateRecipeDto === "undefined" ? Object : _recipestypes.CreateRecipeDto
    ])
], RecipesController.prototype, "createRecipe", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Query)("recipeId")),
    _ts_param(1, (0, _decorators.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ])
], RecipesController.prototype, "getRecipe", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _decorators.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ])
], RecipesController.prototype, "getRecipes", null);
_ts_decorate([
    (0, _common.Patch)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _decorators.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _recipestypes.UpdateRecipeDto === "undefined" ? Object : _recipestypes.UpdateRecipeDto,
        String
    ])
], RecipesController.prototype, "updateRecipe", null);
_ts_decorate([
    (0, _common.Patch)("public"),
    _ts_param(0, (0, _common.Body)("recipeId")),
    _ts_param(1, (0, _decorators.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ])
], RecipesController.prototype, "makeRecipePublic", null);
_ts_decorate([
    (0, _common.Patch)("private"),
    _ts_param(0, (0, _common.Body)("recipeId")),
    _ts_param(1, (0, _decorators.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ])
], RecipesController.prototype, "makeRecipePrivate", null);
_ts_decorate([
    (0, _common.Patch)("save"),
    _ts_param(0, (0, _common.Body)("recipeId")),
    _ts_param(1, (0, _decorators.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ])
], RecipesController.prototype, "saveRecipe", null);
_ts_decorate([
    (0, _common.Patch)("remove"),
    _ts_param(0, (0, _common.Body)("recipeId")),
    _ts_param(1, (0, _decorators.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ])
], RecipesController.prototype, "removeRecipe", null);
_ts_decorate([
    (0, _common.Delete)(),
    _ts_param(0, (0, _decorators.UserId)()),
    _ts_param(1, (0, _common.Body)("recipeId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ])
], RecipesController.prototype, "deleteRecipe", null);
RecipesController = _ts_decorate([
    (0, _common.Controller)(_constants.ROUTES.RECIPES),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _recipesservice.RecipesService === "undefined" ? Object : _recipesservice.RecipesService
    ])
], RecipesController);

//# sourceMappingURL=recipes.controller.js.map