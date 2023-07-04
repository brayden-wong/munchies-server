import { Module } from "@nestjs/common";
import { ChatGateway } from "./message.gateway";
import { MessageService } from "./message.service";

import { AuthModule } from "@/modules/auth";

@Module({
  imports: [AuthModule],
  providers: [ChatGateway, MessageService],
})
export class MessageModule {}
