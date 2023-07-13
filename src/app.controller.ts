import { Controller, Get } from "@nestjs/common";
import { Public } from "./utils";
import {Database, InjectDrizzle, recipes, users} from './modules';

@Controller()
export class AppController {

  constructor(
    @InjectDrizzle()
    private readonly db: Database,
  ) {}

  @Public()
  @Get()
  getHello() {
    return "Hello";
  }

  @Public()
  @Get("delete")
  async deleteAllTables() {
    await this.db.delete(users);
    await this.db.delete(recipes);
    return "Deleted";
  }
}
