import { Public, CurrentUser } from "@/utils";
import { ROUTES } from "@/utils/constants";
import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { FacebookOAuthGuard } from "./facebook.oauth.guard";
import { FacebookService } from "./facebook.service";
import { FacebookUser } from "./facebook.types";
import { Response } from "express";

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
  async callback(@Res() res: Response, @CurrentUser() user: FacebookUser) {
    const result = await this.facebookService.createProfile(user);

    const queryParams = `?at=${result.auth.at}&rt=${result.auth.rt}&id=${result.auth.session.userId}`;

    return res
      .status(200)
      .redirect(`${process.env.APP_URL}/--/screens/login/login${queryParams}`);
  }
}
