import { ROUTES } from "@/utils";
import { Controller } from "@nestjs/common";
import { RecipesService } from "./recipes.service";

@Controller(ROUTES["RECIPES"])
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
}
