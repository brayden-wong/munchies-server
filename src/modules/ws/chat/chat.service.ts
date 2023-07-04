import { Database, InjectDrizzle } from "@/modules/drizzle";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
  constructor(
    @InjectDrizzle()
    private readonly db: Database,
  ) {}
}
