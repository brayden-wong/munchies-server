import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./modules/auth/guards";

import {
  AccountsModule,
  AuthModule,
  DrizzleModule,
  OAuthModule,
  UsersModule,
} from "@/modules";
import { RecipesModule } from "./modules/recipes";
import { WsModule } from "./modules/ws/ws.module";

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DrizzleModule,
    OAuthModule,
    RecipesModule,
    UsersModule,
    WsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
