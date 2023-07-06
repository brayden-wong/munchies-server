import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { createServer } from "https";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./http.exception.filter";
import { WsAdapter } from "./ws.adapter";

import cors from "cors";

async function bootstrap() {
  const AppLogger = new Logger("App");
  const WsLogger = new Logger("Websocket");

  // const keyFile = fs.readFileSync(__dirname + "/../config/server.key");
  // const certFile = fs.readFileSync(__dirname + "/../config/server.crt");

  const app = await NestFactory.create(AppModule);

  const httpsServer = createServer();

  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>("PORT");
  const WS_PORT = config.get<number>("WS_PORT");

  app.use(cors());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useWebSocketAdapter(new WsAdapter(httpsServer));
  try {
    await app.listen(PORT, async () =>
      AppLogger.log(`Server is listening at ${await app.getUrl()}`),
    );

    httpsServer.listen(WS_PORT, () =>
      WsLogger.log(`Websocket is listening at https://[::1]:${WS_PORT}`),
    );
  } catch (error) {
    AppLogger.error(`Error starting server: ${error}`);
    WsLogger.error(`Error starting websocket: ${error}`);
  }
}
bootstrap();
