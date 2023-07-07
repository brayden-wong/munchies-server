import { Module } from "@nestjs/common";
import { MessageModule } from "./messages";
import { RoomsModule } from "./rooms";
import { WsGateway } from "./ws.gateway";

@Module({
  imports: [MessageModule, RoomsModule],
  providers: [WsGateway],
})
export class WsModule {}
