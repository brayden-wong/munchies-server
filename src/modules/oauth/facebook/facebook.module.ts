import { Module } from "@nestjs/common";
import { FacebookController } from "./facebook.controller";
import { FacebookOAuthStrategy } from "./facebook.oauth.strategy";
import { FacebookOAuthGuard } from "./facebook.oauth.guard";
import { FacebookService } from "./facebook.service";
import {
  AccountsModule,
  AuthModule,
  UsersModule,
  UtilsModule,
} from "@/modules";

@Module({
  imports: [AccountsModule, AuthModule, UsersModule, UtilsModule],
  controllers: [FacebookController],
  providers: [FacebookService, FacebookOAuthGuard, FacebookOAuthStrategy],
})
export class FacebookModule {}
