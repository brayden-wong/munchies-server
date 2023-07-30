import { Module } from "@nestjs/common";
import { GoogleController } from "./google.controller";
import { GoogleService } from "./google.service";
import { GoogleOAuthStrategy } from "./google.oauth.strategy";
import { GoogleOAuthGuard } from "./google.oauth.guard";

import { AccountsModule } from "@/modules/accounts";
import { AuthModule } from "@/modules/auth";
import { UsersModule } from "@/modules/users";
import { UtilsModule } from "@/modules/utils";

@Module({
  imports: [AccountsModule, AuthModule, UsersModule, UtilsModule],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleOAuthStrategy, GoogleOAuthGuard],
})
export class GoogleModule {}
