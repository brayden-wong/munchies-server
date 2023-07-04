import { Database, InjectDrizzle } from "@/modules/drizzle";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageService {
  constructor(
    @InjectDrizzle()
    private readonly db: Database,
  ) {}
}
