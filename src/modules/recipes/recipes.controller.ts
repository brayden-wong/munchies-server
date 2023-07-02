import { ROUTES } from "@/utils/constants";
import { UserId } from "@/utils/decorators";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { CreateRecipeDto } from "./recipes.types";

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

  @Get(":recipeId")
  async getRecipe(
    @Param("recipeId")
    recipeId: string,
    @UserId()
    userId: string,
  ) {
    const recipe = await this.recipesService.getRecipe(recipeId, userId);

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
}
