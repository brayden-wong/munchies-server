import { Inject, Injectable } from "@nestjs/common";
import {
  Database,
  InjectDrizzle,
  rooms,
  usersToRooms,
} from "@/modules/drizzle";
import { cuid } from "@/utils/functions";

import type {
  CreateRoomParams,
  DatabaseRoom,
  TransformedRoom,
} from "./rooms.types";
import { GeneratorService } from "@/modules/utils";

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
      .insert(rooms)
      .values({
        id,
        name,
        creatorId,
      })
      .returning();

    this.linkUsersToRooms([...users, creatorId], room.id);

    // await this.db.delete(rooms);

    return room;
  }

  async joinAllAssociatedRooms(userId: string) {
    const rooms = await this.db.query.usersToRooms.findMany({
      with: {
        room: true,
      },
      where: (usersToRooms, { eq }) => {
        return eq(usersToRooms.userId, userId);
      },
    });

    return await this.transformData(rooms);
  }

  private async transformData(
    value: Array<DatabaseRoom>,
  ): Promise<Array<TransformedRoom>>;
  private async transformData(value: DatabaseRoom): Promise<TransformedRoom>;
  private async transformData(
    value: DatabaseRoom | Array<DatabaseRoom>,
  ): Promise<TransformedRoom | Array<TransformedRoom>> {
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

    const rooms: Array<TransformedRoom> = [];

    for (const room of value) {
      const {
        userId,
        room: { id, ...roomData },
      } = room;

      rooms.push({ userId, id, ...roomData });
    }

    return rooms;
  }

  private async linkUsersToRooms(users: Array<string>, roomId: string) {
    await this.db
      .insert(usersToRooms)
      .values(users.map((userId) => ({ userId, roomId })));
  }
}
