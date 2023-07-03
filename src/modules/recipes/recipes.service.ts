import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  Database,
  InjectDrizzle,
  recipes,
  usersToRecipes,
} from "@/modules/drizzle";
import { and, asc, eq } from "drizzle-orm";
import {
  CreateRecipeDto,
  RecipeWithUserId,
  TransformRecipeParam,
  UpdateRecipeDto,
} from "./recipes.types";
import { cuid } from "@/utils/functions";

@Injectable()
export class RecipesService {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async createRecipe(userId: string, createRecipeDto: CreateRecipeDto) {
    const [recipe] = await this.db
      .insert(recipes)
      .values({
        ...createRecipeDto,
        id: cuid(),
      })
      .returning();

    const linkedUserId = await this.linkRecipeToUser(userId, recipe.id);

    return {
      recipe,
      userId: linkedUserId,
    };
  }

  async getRecipe(recipeId: string, userId: string) {
    const recipe = await this.db.query.usersToRecipes.findFirst({
      columns: {
        userId: true,
      },
      where: and(
        eq(usersToRecipes.userId, userId),
        eq(usersToRecipes.recipeId, recipeId),
      ),
      with: {
        recipes: true,
      },
    });
    console.log(recipe);

    if (!recipe)
      throw new HttpException("Recipe not found", HttpStatus.NOT_FOUND);

    const {
      userId: recipeUserId,
      recipes: { id, ...recipeData },
    } = recipe;

    return {
      id,
      userId: recipeUserId,
      ...recipeData,
    };
  }

  async getRecipes(userId: string) {
    const result = await this.db.query.usersToRecipes.findMany({
      columns: {
        userId: true,
      },
      where: eq(usersToRecipes.userId, userId),
      with: {
        recipes: true,
      },
    });

    return await this.transformRecipes(result);
  }

  async updateRecipe(userId: string, updateRecipeDto: UpdateRecipeDto) {
    const result = await this.db.transaction(async (tx) => {
      const resultRecipe = await this.getLinkedRecipe(
        userId,
        updateRecipeDto.id,
      );

      if (!resultRecipe)
        throw new HttpException("Recipe not found", HttpStatus.NOT_FOUND);

      const updatedRecipe = await this.updateRecipeValues(
        resultRecipe,
        updateRecipeDto,
      );

      console.log("before update");

      const { userId: recipeUserId, recipe: recipeData } =
        await this.extractUserId(updatedRecipe);

      const [recipe] = await tx
        .update(recipes)
        .set(recipeData)
        .where(eq(recipes.id, updateRecipeDto.id))
        .returning();

      const { id, ...updatedRecipeData } = recipe;

      return {
        id,
        userId,
        ...updatedRecipeData,
      };
    });

    return result;
  }

  private async getLinkedRecipe(userId: string, recipeId: string) {
    const recipe = await this.db.query.usersToRecipes.findFirst({
      columns: { userId: true },
      where: and(
        eq(usersToRecipes.userId, userId),
        eq(usersToRecipes.recipeId, recipeId),
      ),
      with: {
        recipes: true,
      },
    });

    if (!recipe) return null;

    const transformedRecipe = await this.transformRecipes(recipe);

    return transformedRecipe;
  }

  private async linkRecipeToUser(userId: string, recipeId: string) {
    try {
      const linkedUserId = await this.db.transaction(async (tx) => {
        const linkExists = await tx.query.usersToRecipes.findFirst({
          where: and(
            eq(usersToRecipes.userId, userId),
            eq(usersToRecipes.recipeId, recipeId),
          ),
        });

        if (linkExists) throw new Error("Recipe already is linked to user");

        const [value] = await tx
          .insert(usersToRecipes)
          .values({
            userId,
            recipeId,
          })
          .returning();

        return value.userId;
      });

      return linkedUserId;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }

  private async updateRecipeValues(
    currentRecipe: RecipeWithUserId,
    updateRecipeDto: UpdateRecipeDto,
  ) {
    for (const [key, value] of Object.entries(updateRecipeDto)) {
      if (key !== "ingredients" && key !== "steps") {
        currentRecipe[key] = value;
        continue;
      }

      if (key === "ingredients") {
        const { ingredients } = updateRecipeDto;

        if (!ingredients) continue;

        if (!Array.isArray(ingredients)) {
          const newIngredients = currentRecipe.ingredients.map((ingredient) => {
            if (ingredient.ingrendientId !== ingredients.ingrendientId)
              return ingredient;

            return ingredients;
          });

          currentRecipe.ingredients = newIngredients;
          continue;
        }

        for (let i = 0; i < ingredients.length; i++) {
          const ingredient = ingredients[i];

          if (ingredient.ingrendientId !== ingredients[i].ingrendientId)
            continue;

          currentRecipe.ingredients[i] = ingredient;
        }
      }

      if (key === "steps") {
        const { steps: newSteps } = updateRecipeDto;

        if (!newSteps) continue;

        if (!Array.isArray(newSteps)) {
          const newSteps = currentRecipe.steps.map((step) => {
            if (step.stepId !== newSteps.stepId) return step;

            return newSteps;
          });

          currentRecipe.steps = newSteps;
          continue;
        }

        for (let i = 0; i < newSteps.length; i++) {
          const step = newSteps[i];

          if (step.stepId !== newSteps[i].stepId) continue;

          currentRecipe.steps[i] = step;
        }
      }
    }

    return currentRecipe;
  }

  private async transformRecipes(
    value: TransformRecipeParam,
  ): Promise<RecipeWithUserId>;
  private async transformRecipes(
    value: Array<TransformRecipeParam>,
  ): Promise<Array<RecipeWithUserId>>;
  private async transformRecipes(
    value: TransformRecipeParam | Array<TransformRecipeParam>,
  ): Promise<RecipeWithUserId | Array<RecipeWithUserId>> {
    const recipes: Array<RecipeWithUserId> = [];

    if (!Array.isArray(value)) {
      const { userId, recipes: recipe } = value;
      const { id, ...restOfRecipe } = recipe;

      return {
        id,
        userId,
        ...restOfRecipe,
      };
    }

    for (let i = 0; i < value.length; i++) {
      const { userId, recipes: recipe } = value[i];
      const { id, ...restOfRecipe } = recipe;

      recipes.push({
        id,
        userId,
        ...restOfRecipe,
      });
    }

    return await this.sortRecipesByDate(recipes, { orderBy: "asc" });
  }

  private async sortRecipesByDate(
    array: Array<RecipeWithUserId>,
    options?: {
      orderBy?: "asc" | "desc";
    },
  ) {
    return array.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (options?.orderBy === "asc") return dateA - dateB;
      else return dateB - dateA;
    });
  }

  private async extractUserId(recipe: RecipeWithUserId) {
    const { userId, ...restOfRecipe } = recipe;

    return { userId, recipe: restOfRecipe };
  }
}
