import { Injectable } from "@nestjs/common";
import { Database, InjectDrizzle, messages } from "@/modules/drizzle";
import { CreateMessageDto } from "./message.types";

@Injectable()
export class MessageService {
  constructor(
    @InjectDrizzle()
    private readonly db: Database,
  ) {}

  async createMessage(userId: string, createMessageDto: CreateMessageDto) {
    const [message] = await this.db
      .insert(messages)
      .values({
        ...createMessageDto,
        authorId: userId,
      })
      .returning()
      .catch((error) => {
        throw new Error(error.message);
      });

    return message;
  }
}
