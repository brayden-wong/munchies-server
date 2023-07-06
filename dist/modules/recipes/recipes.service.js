"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RecipesService", {
    enumerable: true,
    get: function() {
        return RecipesService;
    }
});
const _common = require("@nestjs/common");
const _drizzle = require("../drizzle");
const _drizzleorm = require("drizzle-orm");
const _functions = require("../../utils/functions");
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
let RecipesService = class RecipesService {
    async createRecipe(userId, createRecipeDto) {
        const [recipe] = await this.db.insert(_drizzle.recipes).values({
            ...createRecipeDto,
            authorId: userId,
            id: (0, _functions.cuid)()
        }).returning();
        const linkedUserId = await this.linkRecipeToUser(recipe.id, userId);
        return {
            recipe,
            userId: linkedUserId
        };
    }
    async getLinkedRecipe(recipeId, userId) {
        const recipe = await this.db.query.usersToRecipes.findFirst({
            columns: {
                userId: true
            },
            where: (0, _drizzleorm.and)((0, _drizzleorm.eq)(_drizzle.usersToRecipes.userId, userId), (0, _drizzleorm.eq)(_drizzle.usersToRecipes.recipeId, recipeId)),
            with: {
                recipes: true
            }
        });
        if (!recipe) throw new _common.HttpException("Recipe not found", _common.HttpStatus.NOT_FOUND);
        const transformedRecipe = await this.transformRecipe(recipe);
        return transformedRecipe;
    }
    async getRecipes(userId) {
        const result = await this.db.query.usersToRecipes.findMany({
            columns: {
                userId: true
            },
            where: (0, _drizzleorm.eq)(_drizzle.usersToRecipes.userId, userId),
            with: {
                recipes: true
            }
        });
        return await this.transformRecipe(result);
    }
    async makeRecipePublic(recipeId, userId) {
        const recipe = await this.getLinkedRecipe(recipeId, userId);
        if (recipe.authorId !== userId) throw new _common.HttpException("You are not authorized to make this recipe public", _common.HttpStatus.UNAUTHORIZED);
        const [updatedRecipe] = await this.db.update(_drizzle.recipes).set({
            public: true,
            updatedAt: new Date()
        }).where((0, _drizzleorm.and)((0, _drizzleorm.eq)(_drizzle.recipes.id, recipeId), (0, _drizzleorm.eq)(_drizzle.recipes.authorId, userId))).returning();
        return updatedRecipe;
    }
    async makeRecipePrivate(recipeId, userId) {
        const recipe = await this.getLinkedRecipe(recipeId, userId);
        if (recipe.authorId !== userId) throw new _common.HttpException("You are not authorized to make this recipe private", _common.HttpStatus.UNAUTHORIZED);
        const [updatedRecipe] = await this.db.update(_drizzle.recipes).set({
            public: false,
            updatedAt: new Date()
        }).where((0, _drizzleorm.and)((0, _drizzleorm.eq)(_drizzle.recipes.id, recipeId), (0, _drizzleorm.eq)(_drizzle.recipes.authorId, userId))).returning();
        return updatedRecipe;
    }
    async updateRecipe(userId, updateRecipeDto) {
        const result = await this.db.transaction(async (tx)=>{
            const resultRecipe = await this.getLinkedRecipe(userId, updateRecipeDto.id);
            if (!resultRecipe) throw new _common.HttpException("Recipe not found", _common.HttpStatus.NOT_FOUND);
            const updatedRecipe = await this.transformRecipeValues(resultRecipe, updateRecipeDto);
            const { userId: recipeUserId, recipe: recipeData } = await this.extractUserId(updatedRecipe);
            const [recipe] = await tx.update(_drizzle.recipes).set({
                ...recipeData,
                updatedAt: new Date()
            }).where((0, _drizzleorm.eq)(_drizzle.recipes.id, updateRecipeDto.id)).returning();
            const { id, ...updatedRecipeData } = recipe;
            return {
                id,
                userId,
                ...updatedRecipeData
            };
        });
        return result;
    }
    async deleteRecipe(recipeId, userId) {
        const result = await this.db.transaction(async (tx)=>{
            const resultRecipe = await this.getLinkedRecipe(recipeId, userId);
            if (!resultRecipe) throw new _common.HttpException("Recipe not found", _common.HttpStatus.NOT_FOUND);
            if (resultRecipe.authorId !== userId) throw new _common.HttpException("You are not authorized to delete this recipe", _common.HttpStatus.UNAUTHORIZED);
            const [recipe] = await tx.delete(_drizzle.recipes).where((0, _drizzleorm.eq)(_drizzle.recipes.id, recipeId)).returning();
            return recipe;
        });
        return result;
    }
    async saveRecipe(recipeId, userId) {
        const recipe = await this.linkRecipeToUser(recipeId, userId);
        return recipe;
    }
    async unlinkRecipe(recipeId, userId) {
        const [recipe] = await this.db.delete(_drizzle.usersToRecipes).where((0, _drizzleorm.and)((0, _drizzleorm.eq)(_drizzle.usersToRecipes.recipeId, recipeId), (0, _drizzleorm.eq)(_drizzle.usersToRecipes.userId, userId))).returning();
        return {
            recipeId: recipe.recipeId,
            userId: recipe.userId
        };
    }
    async linkRecipeToUser(recipeId, userId) {
        try {
            const linkedUserId = await this.db.transaction(async (tx)=>{
                const linkExists = await tx.query.usersToRecipes.findFirst({
                    where: (0, _drizzleorm.and)((0, _drizzleorm.eq)(_drizzle.usersToRecipes.userId, userId), (0, _drizzleorm.eq)(_drizzle.usersToRecipes.recipeId, recipeId))
                });
                if (linkExists) throw new Error("Recipe already is linked to user");
                const [value] = await tx.insert(_drizzle.usersToRecipes).values({
                    userId,
                    recipeId
                }).returning();
                return value.userId;
            });
            return linkedUserId;
        } catch (error) {
            if (error instanceof Error) {
                throw new _common.HttpException(error.message, _common.HttpStatus.CONFLICT);
            }
        }
    }
    async transformRecipeValues(currentRecipe, updateRecipeDto) {
        for (const [key, value] of Object.entries(updateRecipeDto)){
            if (key !== "ingredients" && key !== "steps") {
                currentRecipe[key] = value;
                continue;
            }
            if (key === "ingredients") {
                const { ingredients } = updateRecipeDto;
                if (!ingredients) continue;
                if (!Array.isArray(ingredients)) {
                    const newIngredients = currentRecipe.ingredients.map((ingredient)=>{
                        if (ingredient.id !== ingredients.id) return ingredient;
                        return ingredients;
                    });
                    currentRecipe.ingredients = newIngredients;
                    continue;
                }
                for(let i = 0; i < ingredients.length; i++){
                    const ingredient = ingredients[i];
                    const index = currentRecipe.ingredients.findIndex((ingredient)=>ingredient.id === ingredient.id);
                    if (index === -1) {
                        currentRecipe.ingredients.push(ingredient);
                        continue;
                    }
                    currentRecipe.ingredients[index] = ingredient;
                    continue;
                }
            }
            if (key === "steps") {
                const { steps: currentStep } = updateRecipeDto;
                if (!currentStep) continue;
                if (!Array.isArray(currentStep)) {
                    const newSteps = currentRecipe.steps.map((step)=>{
                        if (step.id !== currentStep.id) return step;
                        return newSteps;
                    });
                    currentRecipe.steps = newSteps;
                    continue;
                }
                for(let i = 0; i < currentStep.length; i++){
                    const step = currentStep[i];
                    const index = currentRecipe.steps.findIndex((currentStep)=>step.id === currentStep.id);
                    if (index === -1) {
                        currentRecipe.steps.push(step);
                        continue;
                    }
                    currentRecipe.steps[index] = step;
                    continue;
                }
            }
        }
        return currentRecipe;
    }
    async transformRecipe(value) {
        if (!Array.isArray(value)) {
            const { userId, recipes: recipe } = value;
            const { id, ...restOfRecipe } = recipe;
            return {
                id,
                userId,
                ...restOfRecipe
            };
        }
        const recipes = [];
        for(let i = 0; i < value.length; i++){
            const { userId, recipes: recipe } = value[i];
            const { id, ...restOfRecipe } = recipe;
            recipes.push({
                id,
                userId,
                ...restOfRecipe
            });
        }
        return await this.sortRecipesByDate(recipes, {
            orderBy: "asc"
        });
    }
    async sortRecipesByDate(array, options) {
        return array.sort((a, b)=>{
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            if (options?.orderBy === "asc") return dateA - dateB;
            else return dateB - dateA;
        });
    }
    async extractUserId(recipe) {
        const { userId, ...restOfRecipe } = recipe;
        return {
            userId,
            recipe: restOfRecipe
        };
    }
    constructor(db){
        _define_property(this, "db", void 0);
        this.db = db;
    }
};
RecipesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _drizzle.InjectDrizzle)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _drizzle.Database === "undefined" ? Object : _drizzle.Database
    ])
], RecipesService);

//# sourceMappingURL=recipes.service.js.map