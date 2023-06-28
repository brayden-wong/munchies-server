import { Module } from "@nestjs/common";
import { HashService } from "./services";

@Module({
  providers: [HashService],
  exports: [HashService],
})
export class UtilsModule {}
