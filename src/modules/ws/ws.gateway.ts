import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(
    @ConnectedSocket()
    socket: Socket,
  ) {
    console.log(`socket ${socket.id} has connected`);
  }
}
