import { Controller, Get } from "@nestjs/common";
import { Public } from "./utils";

@Controller()
export class AppController {
  @Public()
  @Get()
  getHello() {
    return "Hello";
  }
}
