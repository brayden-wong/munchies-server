import { IoAdapter } from "@nestjs/platform-socket.io";
import express, { Express } from "express";
import { Server } from "socket.io";

import type { ServerOptions } from "socket.io";

const app = express();
export class WsAdapter extends IoAdapter {
  protected ioServer: Server;

  constructor(protected server: Express) {
    super();

    const options = {};

    // this.ioServer = new Server(this.server, options);
  }

  create(port: number, options: ServerOptions) {
    return this.ioServer;
  }
}
