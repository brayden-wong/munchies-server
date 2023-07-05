import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  Database,
  InjectDrizzle,
  recipes,
  usersToRecipes,
} from "@/modules/drizzle";
import { and, eq } from "drizzle-orm";
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
        authorId: userId,
        id: cuid(),
      })
      .returning();

    const linkedUserId = await this.linkRecipeToUser(recipe.id, userId);

    return {
      recipe,
      userId: linkedUserId,
    };
  }

  async getLinkedRecipe(recipeId: string, userId: string) {
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

    if (!recipe)
      throw new HttpException("Recipe not found", HttpStatus.NOT_FOUND);

    const transformedRecipe = await this.transformRecipe(recipe);

    return transformedRecipe;
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

    return await this.transformRecipe(result);
  }

  async makeRecipePublic(recipeId: string, userId: string) {
    const recipe = await this.getLinkedRecipe(recipeId, userId);

    if (recipe.authorId !== userId)
      throw new HttpException(
        "You are not authorized to make this recipe public",
        HttpStatus.UNAUTHORIZED,
      );

    const [updatedRecipe] = await this.db
      .update(recipes)
      .set({
        public: true,
        updatedAt: new Date(),
      })
      .where(and(eq(recipes.id, recipeId), eq(recipes.authorId, userId)))
      .returning();

    return updatedRecipe;
  }

  async makeRecipePrivate(recipeId: string, userId: string) {
    const recipe = await this.getLinkedRecipe(recipeId, userId);

    if (recipe.authorId !== userId)
      throw new HttpException(
        "You are not authorized to make this recipe private",
        HttpStatus.UNAUTHORIZED,
      );

    const [updatedRecipe] = await this.db
      .update(recipes)
      .set({
        public: false,
        updatedAt: new Date(),
      })
      .where(and(eq(recipes.id, recipeId), eq(recipes.authorId, userId)))
      .returning();

    return updatedRecipe;
  }

  async updateRecipe(userId: string, updateRecipeDto: UpdateRecipeDto) {
    const result = await this.db.transaction(async (tx) => {
      const resultRecipe = await this.getLinkedRecipe(
        userId,
        updateRecipeDto.id,
      );

      if (!resultRecipe)
        throw new HttpException("Recipe not found", HttpStatus.NOT_FOUND);

      const updatedRecipe = await this.transformRecipeValues(
        resultRecipe,
        updateRecipeDto,
      );

      const { userId: recipeUserId, recipe: recipeData } =
        await this.extractUserId(updatedRecipe);

      const [recipe] = await tx
        .update(recipes)
        .set({
          ...recipeData,
          updatedAt: new Date(),
        })
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

  async deleteRecipe(recipeId: string, userId: string) {
    const result = await this.db.transaction(async (tx) => {
      const resultRecipe = await this.getLinkedRecipe(recipeId, userId);

      if (!resultRecipe)
        throw new HttpException("Recipe not found", HttpStatus.NOT_FOUND);

      if (resultRecipe.authorId !== userId)
        throw new HttpException(
          "You are not authorized to delete this recipe",
          HttpStatus.UNAUTHORIZED,
        );

      const [recipe] = await tx
        .delete(recipes)
        .where(eq(recipes.id, recipeId))
        .returning();

      return recipe;
    });

    return result;
  }

  async saveRecipe(recipeId: string, userId: string) {
    const recipe = await this.linkRecipeToUser(recipeId, userId);

    return recipe;
  }

  async unlinkRecipe(recipeId: string, userId: string) {
    const [recipe] = await this.db
      .delete(usersToRecipes)
      .where(
        and(
          eq(usersToRecipes.recipeId, recipeId),
          eq(usersToRecipes.userId, userId),
        ),
      )
      .returning();

    return {
      recipeId: recipe.recipeId,
      userId: recipe.userId,
    };
  }

  private async linkRecipeToUser(recipeId: string, userId: string) {
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

  private async transformRecipeValues(
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
            if (ingredient.id !== ingredients.id) return ingredient;

            return ingredients;
          });

          currentRecipe.ingredients = newIngredients;
          continue;
        }

        for (let i = 0; i < ingredients.length; i++) {
          const ingredient = ingredients[i];

          const index = currentRecipe.ingredients.findIndex(
            (ingredient) => ingredient.id === ingredient.id,
          );

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
          const newSteps = currentRecipe.steps.map((step) => {
            if (step.id !== currentStep.id) return step;

            return newSteps;
          });

          currentRecipe.steps = newSteps;
          continue;
        }

        for (let i = 0; i < currentStep.length; i++) {
          const step = currentStep[i];

          const index = currentRecipe.steps.findIndex(
            (currentStep) => step.id === currentStep.id,
          );

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

  private async transformRecipe(
    value: TransformRecipeParam,
  ): Promise<RecipeWithUserId>;
  private async transformRecipe(
    value: Array<TransformRecipeParam>,
  ): Promise<Array<RecipeWithUserId>>;
  private async transformRecipe(
    value: TransformRecipeParam | Array<TransformRecipeParam>,
  ): Promise<RecipeWithUserId | Array<RecipeWithUserId>> {
    if (!Array.isArray(value)) {
      const { userId, recipes: recipe } = value;
      const { id, ...restOfRecipe } = recipe;

      return {
        id,
        userId,
        ...restOfRecipe,
      };
    }

    const recipes: Array<RecipeWithUserId> = [];

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
