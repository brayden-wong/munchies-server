import { Module } from "@nestjs/common";
import { GeneratorService, HashService } from "./services";

@Module({
  providers: [HashService, GeneratorService],
  exports: [HashService, GeneratorService],
})
export class UtilsModule {}
