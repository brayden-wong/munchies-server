import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./http.exception.filter";

import cors from "cors";

async function bootstrap() {
  const AppLogger = new Logger("App");
  const WsLogger = new Logger("Websocket");

  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>("PORT");

  app.use(cors());
  app.useGlobalFilters(new HttpExceptionFilter());
  try {
    await app.listen(PORT, async () =>
      AppLogger.log(`Server is listening at ${await app.getUrl()}`),
    );
  } catch (error) {
    AppLogger.error(`Error starting server: ${error}`);
    WsLogger.error(`Error starting websocket: ${error}`);
  }
}
bootstrap();
