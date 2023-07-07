import { UseGuards } from "@nestjs/common";
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { C } from "drizzle-orm/db.d-cf0abe10";
import type { Server, Socket } from "socket.io";
import { WsGuard } from "./ws.guard";
import { CurrentUserId } from "./decorators";

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsGuard)
  handleConnection(
    @ConnectedSocket()
    socket: Socket,
    @CurrentUserId()
    userId: string,
  ) {
    console.log(`socket ${socket.id} has connected`);
    console.log(userId, "has connected");
  }

  handleDisconnect(
    @ConnectedSocket()
    socket: Socket,
  ) {
    console.log(`socket ${socket.id} has disconnected`);
    socket.disconnect();
  }
}
