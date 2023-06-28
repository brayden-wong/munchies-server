import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DrizzleModule, UsersModule } from "@/modules";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DrizzleModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
