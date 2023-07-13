import { ROUTES } from "@/utils/constants";
import { UserId } from "@/utils/decorators";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { CreateRecipeDto, UpdateRecipeDto } from "./recipes.types";

@Controller(ROUTES.RECIPES)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async createRecipe(
    @UserId()
    userId: string,
    @Body()
    createRecipeDto: CreateRecipeDto,
  ) {
    const recipe = await this.recipesService.createRecipe(
      userId,
      createRecipeDto,
    );

    return {
      status: "ok",
      statusCode: 201,
      data: recipe,
    };
  }

  @Get()
  async getRecipe(
    @Query("recipeId")
    recipeId: string,
    @UserId()
    userId: string,
  ) {
    const recipe = await this.recipesService.getLinkedRecipe(recipeId, userId);

    return {
      status: "ok",
      statusCode: 200,
      data: recipe,
    };
  }

  @Get()
  async getRecipes(@UserId() userId: string) {
    const recipes = await this.recipesService.getRecipes(userId);

    return {
      status: "ok",
      statusCode: 200,
      data: recipes,
    };
  }

  @Patch()
  async updateRecipe(
    @Body()
    updateRecipeDto: UpdateRecipeDto,
    @UserId()
    userId: string,
  ) {
    const updatedRecipe = await this.recipesService.updateRecipe(
      userId,
      updateRecipeDto,
    );

    return {
      status: "ok",
      statusCode: 200,
      data: updatedRecipe,
    };
  }

  @Patch("public")
  async makeRecipePublic(
    @Body("recipeId")
    recipeId: string,
    @UserId()
    userId: string,
  ) {
    const recipe = await this.recipesService.makeRecipePublic(recipeId, userId);

    return {
      status: "ok",
      statusCode: 200,
      data: recipe,
    };
  }

  @Patch("private")
  async makeRecipePrivate(
    @Body("recipeId")
    recipeId: string,
    @UserId()
    userId: string,
  ) {
    const recipe = await this.recipesService.makeRecipePrivate(
      recipeId,
      userId,
    );

    return {
      status: "ok",
      statusCode: 200,
      data: recipe,
    };
  }

  // @Patch("save")
  // async saveRecipe(
  //   @Body("recipeId")
  //   recipeId: string,
  //   @UserId()
  //   userId: string,
  // ) {}

  // @Patch("remove")
  // async removeRecipe(
  //   @Body("recipeId")
  //   recipeId: string,
  //   @UserId()
  //   userId: string,
  // ) {}

  @Delete()
  async deleteRecipe(
    @UserId()
    userId: string,
    @Body("recipeId")
    recipeId: string,
  ) {
    const result = await this.recipesService.deleteRecipe(recipeId, userId);

    return {
      status: "ok",
      statusCode: 200,
      data: {
        status: "deleted",
        recipe: result,
      },
    };
  }
}
