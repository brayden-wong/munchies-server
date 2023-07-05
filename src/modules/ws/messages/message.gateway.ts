import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";

import { MessageService } from "./message.service";
import { CurrentUserId } from "../decorators";
import { WsGuard } from "../ws.guard";

import type { Server, Socket } from "socket.io";
import { SUBSCRIPTIONS } from "./message.constants";
import { CreateMessageDto } from "./message.types";

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @UseGuards(WsGuard)
  @SubscribeMessage(SUBSCRIPTIONS["send message"])
  async connect(
    @ConnectedSocket()
    socket: Socket,
    @CurrentUserId()
    userId: string,
    @MessageBody()
    data: CreateMessageDto,
  ) {
    const message = await this.messageService.createMessage(userId, data);
    socket.to(message.roomId).emit("messages", message);
    //notification service here to add the notification at the create message level
  }
}
