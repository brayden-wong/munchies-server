import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { SessionsModule } from "@/modules/sessions";
import { UsersModule } from "@/modules/users";
import { AuthController } from "./auth.controller";
import { AtStrategy, AuthService, LocalStrategy, RtStrategy } from "./services";
import { UtilsModule } from "@/modules/utils";
import { AtGuard, LocalGuard, RtGuard } from "./guards";

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({}),
    SessionsModule,
    UsersModule,
    UtilsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalGuard,
    AtStrategy,
    AtGuard,
    RtStrategy,
    RtGuard,
  ],
  exports: [AtGuard, LocalGuard, RtGuard],
})
export class AuthModule {}
