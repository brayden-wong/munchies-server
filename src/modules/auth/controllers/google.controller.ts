import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleService } from "../services";
import { GoogleOAuthGuard } from "../guards";

import { ROUTES } from "@/utils/constants";
import { Public, User } from "@/utils/decorators";
import type { GoogleUser } from "@/utils/types";

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
  async googleAuthRedirect(@User() user: GoogleUser) {
    const {
      account,
      session,
      user: userData,
    } = await this.googleService.createProfile(user);

    return {
      status: "ok",
      statusCode: 200,
      data: {
        account,
        auth: session,
        user: userData,
      },
    };
  }
}
