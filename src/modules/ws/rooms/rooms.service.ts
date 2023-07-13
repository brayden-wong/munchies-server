import { Inject, Injectable } from "@nestjs/common";
import {
  Database,
  InjectDrizzle,
  rooms as roomsTable,
  usersToRooms,
} from "@/modules/drizzle";
import { cuid } from "@/utils/functions";

import type {
  CreateRoomParams,
  DatabaseRoom,
  Room,
  Rooms,
  TransformedRoom,
} from "./rooms.types";
import { GeneratorService } from "@/modules/utils";
import { eq } from "drizzle-orm";

@Injectable()
export class RoomsService {
  constructor(
    @Inject(GeneratorService)
    private readonly generatorService: GeneratorService,
    @InjectDrizzle()
    private readonly db: Database,
  ) {}

  async createRoom({ creatorId, users }: CreateRoomParams) {
    const name = await this.generatorService.generateRoomName();
    const id = cuid();

    const [room] = await this.db
      .insert(roomsTable)
      .values({
        id,
        name,
        creatorId,
      })
      .returning();

    this.linkUsersToRooms([...users, creatorId], room.id);

    return room;
  }

  async joinAllAssociatedRooms(userId: string) {
    return await this.db.transaction(async (tx) => {
      const roomIds = await tx.query.usersToRooms
        .findMany({
          columns: { roomId: true },
          where: (usersToRooms, { eq }) => eq(usersToRooms.userId, userId),
        })
        .execute();

      const rooms: Rooms = [];
      for (const { roomId } of roomIds) {
        const allRooms = await tx.query.usersToRooms
          .findMany({
            columns: {},
            with: {
              user: {
                columns: {
                  id: true,
                  username: true,
                  email: true,
                  name: true,
                }
              },
              room: { columns: { id: true } },
            },
            where: eq(usersToRooms.roomId, roomId),
          })
          .execute();

        const room: Room = {
          roomId: userId,
          users: [],
        };
        for (const {
          room: { id },
          user
        } of allRooms) {
          room.roomId = id;
          room.users.push(user);
        }

        rooms.push(room);
      }

      return rooms;
    });
  }

  private async transformData(value: DatabaseRoom): Promise<TransformedRoom>;
  private async transformData(
    value: DatabaseRoom,
  ): Promise<TransformedRoom> {
    if (!Array.isArray(value)) {
      const {
        userId,
        room: { id, ...room },
      } = value;

      return {
        id,
        userId,
        ...room,
      };
    }
  }

  private async linkUsersToRooms(users: Array<string>, roomId: string) {
    await this.db
      .insert(usersToRooms)
      .values(users.map((userId) => ({ userId, roomId })));
  }
}
