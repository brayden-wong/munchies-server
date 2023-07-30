import { Public, CurrentUser } from "@/utils";
import { ROUTES } from "@/utils/constants";
import { Controller, Get, Inject, Res, UseGuards } from "@nestjs/common";
import { FacebookOAuthGuard } from "./facebook.oauth.guard";
import { FacebookService } from "./facebook.service";
import { FacebookUser } from "./facebook.types";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller(ROUTES.FACEBOOK)
export class FacebookController {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    private readonly facebookService: FacebookService,
  ) {}

  @Public()
  @Get()
  @UseGuards(FacebookOAuthGuard)
  async oauth() {}

  @Public()
  @Get("redirect")
  @UseGuards(FacebookOAuthGuard)
  async callback(
    @Res() res: Response,
    @CurrentUser({ user: "FacebookUser", key: undefined }) user: FacebookUser,
  ) {
    const { auth, user: currentUser } =
      await this.facebookService.createProfile(user);
    const queryParams = `?at=${auth.accessToken}&rt=${
      auth.refreshToken
    }&userId=${currentUser.id}&username=${currentUser.username}&name=${
      currentUser.name ?? ""
    }&email=${currentUser.email ?? ""}`;

    return res
      .status(200)
      .redirect(
        `${this.config.get("APP_URL")}/--/screens/login/login${queryParams}`,
      );
  }
}
