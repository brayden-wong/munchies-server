import { Module } from "@nestjs/common";
import { RoomsGateway } from "./rooms.gateway";
import { RoomsService } from "./rooms.service";

@Module({
  providers: [RoomsGateway, RoomsService],
})
export class RoomsModule {}
