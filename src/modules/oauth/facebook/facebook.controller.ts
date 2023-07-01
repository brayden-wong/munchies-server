import { Public, User } from "@/utils";
import { ROUTES } from "@/utils/constants";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { FacebookOAuthGuard } from "./facebook.oauth.guard";
import { Profile } from "passport-facebook";
import { FacebookService } from "./facebook.service";
import { FacebookUser } from "./facebook.types";

@Controller(ROUTES.FACEBOOK)
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Public()
  @Get()
  @UseGuards(FacebookOAuthGuard)
  async oauth() {}

  @Public()
  @Get("redirect")
  @UseGuards(FacebookOAuthGuard)
  async callback(@User() user: FacebookUser) {
    const result = await this.facebookService.createProfile(user);

    return {
      status: "ok",
      statusCode: 200,
      data: {
        ...result,
      },
    };
  }
}
