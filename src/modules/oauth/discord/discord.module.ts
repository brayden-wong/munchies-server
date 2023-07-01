import { AccountsModule } from "@/modules/accounts";
import { AuthModule } from "@/modules/auth";
import { SessionsModule } from "@/modules/sessions";
import { UsersModule } from "@/modules/users";
import { UtilsModule } from "@/modules/utils";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    SessionsModule,
    UsersModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class DiscordModule {}
