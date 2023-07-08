import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import type { Server, Socket } from "socket.io";

import { SUBSCRIPTIONS } from "./rooms.constants";
import { RoomsService } from "./rooms.service";
import { CurrentUserId } from "../decorators";
import { WsGuard } from "../ws.guard";

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(WsGuard)
  @SubscribeMessage(SUBSCRIPTIONS["create room"])
  async createRoom(
    @ConnectedSocket()
    socket: Socket,
    @CurrentUserId()
    currentUserId: string,
    @MessageBody()
    data: { userIds: Array<string> },
  ) {
    const room = await this.roomsService.createRoom({
      creatorId: currentUserId,
      users: data.userIds,
    });

    socket.join(room.id);
    socket.emit(currentUserId, {
      status: "ok",
      statusCode: 201,
      data: room,
    });
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(SUBSCRIPTIONS["join rooms"])
  async joinRooms(
    @ConnectedSocket()
    socket: Socket,
    @CurrentUserId()
    currentUserId: string,
  ) {
    const rooms = await this.roomsService.joinAllAssociatedRooms(currentUserId);
    for (const { roomId } of rooms) {
      await socket.join(roomId);
    }

    await socket.join(currentUserId);

    socket.emit(currentUserId, {
      status: "ok",
      statusCode: 200,
      data: rooms,
    });

    return rooms;
  }
}
