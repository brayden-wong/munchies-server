import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { SessionsModule } from "@/modules/sessions";
import { UsersModule } from "@/modules/users";
import { AuthController, GoogleController } from "./controllers";
import {
  AtStrategy,
  AuthService,
  GoogleOAuthStrategy,
  GoogleService,
  LocalStrategy,
  RtStrategy,
} from "./services";
import { UtilsModule } from "@/modules/utils";
import { AtGuard, GoogleOAuthGuard, LocalGuard, RtGuard } from "./guards";

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({}),
    SessionsModule,
    UsersModule,
    UtilsModule,
  ],
  controllers: [AuthController, GoogleController],
  providers: [
    AuthService,
    GoogleService,
    LocalStrategy,
    LocalGuard,
    AtStrategy,
    AtGuard,
    GoogleOAuthStrategy,
    GoogleOAuthGuard,
    RtStrategy,
    RtGuard,
  ],
  exports: [AtGuard, LocalGuard, RtGuard],
})
export class AuthModule {}
