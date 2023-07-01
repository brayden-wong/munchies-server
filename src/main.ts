import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { HttpExceptionFilter } from "./http.exception.filter";

import * as fs from "fs";

async function bootstrap() {
  const keyFile = fs.readFileSync(__dirname + "/../config/server.key");
  const certFile = fs.readFileSync(__dirname + "/../config/server.crt");

  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>("PORT");

  try {
    await app.listen(PORT, async () =>
      logger.log(`Server is listening at ${await app.getUrl()}`),
    );
  } catch (error) {
    logger.error(`Error starting server: ${error}`);
  }
}
bootstrap();
