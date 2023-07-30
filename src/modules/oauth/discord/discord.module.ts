import { Module } from "@nestjs/common";
import { DiscordController } from "./discord.controller";
import { DiscordOAuthStrategy } from "./discord.oauth.strategy";
import { DiscordService } from "./discord.service";
import { AccountsModule } from "@/modules/accounts";
import { AuthModule } from "@/modules/auth";
import { UsersModule } from "@/modules/users";
import { UtilsModule } from "@/modules/utils";

@Module({
  imports: [AccountsModule, AuthModule, UsersModule, UtilsModule],
  controllers: [DiscordController],
  providers: [DiscordService, DiscordOAuthStrategy, DiscordOAuthStrategy],
})
export class DiscordModule {}
