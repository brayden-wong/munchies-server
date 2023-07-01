import { Injectable } from "@nestjs/common";
import { Database, InjectDrizzle } from "@/modules/drizzle";

@Injectable()
export class RecipesService {
  constructor(@InjectDrizzle() private readonly db: Database) {}
}
