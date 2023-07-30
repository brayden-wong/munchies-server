import { Controller, Get, Query } from "@nestjs/common";
import { ExploreService } from "./explore.service";
import { Public, ROUTES } from "@/utils";
import { GetExploreParams } from "./explore.types";

@Controller(ROUTES.EXPLORE)
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Public()
  @Get()
  async getExplore(@Query() params: GetExploreParams) {
    if (Object.keys(params).length === 0) {
      return {
        status: "ok",
        statusCode: 200,
        data: {
          users: [],
          recipes: [],
        },
      };
    }
    const result = await this.exploreService.getExplore(params);
    
    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }
}
