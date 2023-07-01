import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleService } from "./google.service";

import { ROUTES } from "@/utils/constants";
import { Public, User } from "@/utils/decorators";
import { GoogleOAuthGuard } from "./google.oauth.guard";
import { GoogleUser } from "./google.types";

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
    const result = await this.googleService.createProfile(user);

    return {
      status: "ok",
      statusCode: 200,
      data: {
        ...result,
      },
    };
  }
}
