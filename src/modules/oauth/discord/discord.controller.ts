import { Public, ROUTES, CurrentUser } from "@/utils";
import { Controller, Get, Inject, Res, UseGuards } from "@nestjs/common";
import { DiscordOAuthGuard } from "./discord.oauth.guard";
import { DiscordProfile } from "./discord.types";
import { DiscordService } from "./discord.service";
import { type Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller(ROUTES.DISCORD)
export class DiscordController {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    private readonly discordService: DiscordService,
  ) {}

  @Public()
  @UseGuards(DiscordOAuthGuard)
  @Get()
  async discordLogin() {
    console.log("endpoint hit");
    return { message: "login" };
  }

  @Public()
  @UseGuards(DiscordOAuthGuard)
  @Get("callback")
  async callback(
    @Res() res: Response,
    @CurrentUser({ user: "DiscordUser", key: null }) user: DiscordProfile,
  ) {
    console.log("here");
    const { auth, user: currentUser } = await this.discordService.createProfile(
      user,
    );

    const queryParams = `?at=${auth.at}&rt=${auth.rt}&userId=${
      currentUser.id
    }&username=${currentUser.username}&name=${currentUser.name ?? ""}&email=${
      currentUser.email ?? ""
    }`;

    console.log(auth.rt);

    return res
      .status(200)
      .redirect(
        `${this.config.get("APP_URL")}/--/screens/login/login${queryParams}`,
      );
  }
}
