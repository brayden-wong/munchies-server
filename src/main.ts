import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { HttpExceptionFilter } from "./http.exception.filter";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>("PORT");

  try {
    await app.listen(PORT, () => logger.log(`Server started on port ${PORT}`));
  } catch (error) {
    logger.error(`Error starting server: ${error}`);
  }
}
bootstrap();
