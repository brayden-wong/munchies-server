import { Module } from "@nestjs/common";
import { MessageModule } from "./messages";
import { RoomsModule } from "./rooms";

@Module({
  imports: [MessageModule, RoomsModule],
})
export class WsModule {}
