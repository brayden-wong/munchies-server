import { Module } from "@nestjs/common";
import { FacebookController } from "./facebook.controller";
import { FacebookOAuthStrategy } from "./facebook.oauth.strategy";
import { FacebookOAuthGuard } from "./facebook.oauth.guard";
import { FacebookService } from "./facebook.service";
import {
  AccountsModule,
  AuthModule,
  SessionsModule,
  UsersModule,
  UtilsModule,
} from "@/modules";

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    SessionsModule,
    UsersModule,
    UtilsModule,
  ],
  controllers: [FacebookController],
  providers: [FacebookService, FacebookOAuthGuard, FacebookOAuthStrategy],
})
export class FacebookModule {}
