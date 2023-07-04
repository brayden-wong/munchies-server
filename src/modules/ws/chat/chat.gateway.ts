import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import { Public, WsUserId } from "@/utils/decorators";
import { ChatService } from "./chat.service";
import { ROUTES } from "./chat.constants";
import { WsGuard } from "../ws.guard";

import type { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @Public()
  // @UseGuards(WsGuard)
  @SubscribeMessage("message")
  async connect(
    @ConnectedSocket()
    socket: Socket,
    // @WsUserId()
    // userId: string,
  ) {
    return socket.emit("message", {
      message: "You are Gay!",
    });
  }
}
