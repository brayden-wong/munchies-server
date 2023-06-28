import { Module } from "@nestjs/common";
import { UtilsModule } from "@/modules/utils";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  imports: [UtilsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
