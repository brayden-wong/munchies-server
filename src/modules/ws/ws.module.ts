import { Module } from "@nestjs/common";
import { MessageModule } from "./messages";

@Module({
  imports: [MessageModule],
})
export class WsModule {}
