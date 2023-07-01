import { Public, ROUTES, User } from "@/utils";
import { Controller, Get, Session, UseGuards } from "@nestjs/common";
import { DiscordOAuthGuard } from "./discord.oauth.guard";
import { DiscordProfile } from "./discord.types";
import { DiscordService } from "./discord.service";

@Controller(ROUTES.DISCORD)
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}

  @Public()
  @UseGuards(DiscordOAuthGuard)
  @Get()
  async discordLogin() {
    return { message: "login" };
  }

  @Public()
  @UseGuards(DiscordOAuthGuard)
  @Get("callback")
  async callback(@User() user: DiscordProfile) {
    const result = await this.discordService.createProfile(user);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }
}
