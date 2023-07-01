import {
  AccountsModule,
  AuthModule,
  UsersModule,
  UtilsModule,
} from "@/modules";
import { Module } from "@nestjs/common";
import { DiscordController } from "./discord.controller";
import { DiscordOAuthStrategy } from "./discord.oauth.strategy";
import { DiscordService } from "./discord.service";

@Module({
  imports: [AccountsModule, AuthModule, UsersModule, UtilsModule],
  controllers: [DiscordController],
  providers: [DiscordService, DiscordOAuthStrategy, DiscordOAuthStrategy],
})
export class DiscordModule {}
