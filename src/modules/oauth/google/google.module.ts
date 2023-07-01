import { Module } from "@nestjs/common";
import { GoogleController } from "./google.controller";
import { GoogleService } from "./google.service";

import {
  AccountsModule,
  AuthModule,
  SessionsModule,
  UsersModule,
  UtilsModule,
} from "@/modules";
import { GoogleOAuthStrategy } from "./google.oauth.strategy";
import { GoogleOAuthGuard } from "./google.oauth.guard";

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    SessionsModule,
    UsersModule,
    UtilsModule,
  ],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleOAuthStrategy, GoogleOAuthGuard],
})
export class GoogleModule {}
