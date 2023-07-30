import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./modules/auth/guards";

import {
  AccountsModule,
  AuthModule,
  DrizzleModule,
  ExploreModule,
  OAuthModule,
  RecipesModule,
  UsersModule,
  WsModule,
} from "@/modules";
import { AppController } from "./app.controller";

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DrizzleModule,
    ExploreModule,
    OAuthModule,
    RecipesModule,
    UsersModule,
    WsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
