import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(
    @ConnectedSocket()
    socket: Socket,
  ) {
    console.log(`socket ${socket.id} has connected`);
  }

  handleDisconnect(
    @ConnectedSocket()
    socket: Socket,
  ) {
    console.log(`socket ${socket.id} has disconnected`);
    socket.disconnect();
  }
}
