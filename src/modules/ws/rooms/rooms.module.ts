import { Module } from "@nestjs/common";
import { RoomsGateway } from "./rooms.gateway";
import { RoomsService } from "./rooms.service";
import { AuthModule } from "@/modules/auth";
import { UtilsModule } from "@/modules/utils";

@Module({
  imports: [AuthModule, UtilsModule],
  providers: [RoomsGateway, RoomsService],
})
export class RoomsModule {}
