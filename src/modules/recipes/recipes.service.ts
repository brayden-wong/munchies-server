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
  TransformRecipeArray,
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

  private async transformRecipes(array: TransformRecipeArray) {
    const recipes: Array<RecipeWithUserId> = [];

    for (let i = 0; i < array.length; i++) {
      const { userId, recipes: recipe } = array[i];
      const { id, ...restOfRecipe } = recipe;

      recipes.push({
        id,
        userId,
        ...restOfRecipe,
      });
    }

    return await this.sortRecipesByDate(recipes, { orderBy: "desc" });
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
}
