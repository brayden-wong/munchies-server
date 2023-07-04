import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";

import { AuthModule } from "@/modules/auth";

@Module({
  imports: [AuthModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
