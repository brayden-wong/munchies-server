import { Module } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { UtilsModule } from "../utils";

@Module({
  imports: [UtilsModule],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
