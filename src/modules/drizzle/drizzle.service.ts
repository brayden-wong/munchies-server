import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectDrizzle } from "./drizzle.constants";
import { Database } from "./drizzle.types";
import { users } from "./schemas";
import { eq } from "drizzle-orm";

@Injectable()
export class DrizzleService {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async reconnectDb() {
    await this.db.select().from(users).where(eq(users.id, ""));
  }
}
