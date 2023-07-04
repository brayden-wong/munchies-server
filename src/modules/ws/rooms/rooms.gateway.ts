import {
  ConnectedSocket,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import type { Server, Socket } from "socket.io";

import { RoomsService } from "./rooms.service";
import { WsGuard } from "../ws.guard";
import type { JoinRoomsParams } from "./rooms.types";

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(WsGuard)
  async joinRooms(
    @ConnectedSocket()
    socket: Socket,
    @MessageBody()
    data: JoinRoomsParams,
  ) {}
}
