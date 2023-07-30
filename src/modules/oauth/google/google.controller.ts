import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { GoogleService } from "./google.service";

import { ROUTES } from "@/utils/constants";
import { Public, CurrentUser } from "@/utils/decorators";
import { GoogleOAuthGuard } from "./google.oauth.guard";
import { GoogleUser } from "./google.types";
import { Response } from "express";

@Controller(ROUTES.GOOGLE)
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Public()
  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Public()
  @Get("callback")
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @Res() res: Response,
    @CurrentUser({ user: "GoogleUser", key: undefined }) user: GoogleUser,
  ) {
    const result = await this.googleService.createProfile(user);

    const queryParams = `?at=${result.auth.accessToken}&rt=${result.auth.refreshToken}&id=${result.user.id}`;

    return res
      .status(200)
      .redirect(`${process.env.APP_URL}/--/screens/login/login${queryParams}`);
  }
}
