import { Module } from "@nestjs/common";
import { UsersModule } from "@/modules/users";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services";

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
