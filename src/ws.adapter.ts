import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server as HttpsServer } from "https";
import { Server } from "socket.io";

import type { ServerOptions } from "socket.io";

export class WsAdapter extends IoAdapter {
  protected ioServer: Server;

  constructor(protected server: HttpsServer) {
    super();

    const options = {};

    this.ioServer = new Server(this.server, options);
  }

  create(port: number, options: ServerOptions) {
    return this.ioServer;
  }
}
