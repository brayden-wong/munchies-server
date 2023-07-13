import { GUARDS } from "@/utils/constants";
import { Inject, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "@/modules";

import type { ExecutionContext } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class WsGuard extends AuthGuard(GUARDS.AT) {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const headers = client?.handshake?.headers;

    if (!headers.authorization) return false;

    const token = headers.authorization;

    console.log(token);

    const userToken = await this.authService.validateToken(token);

    if (!userToken) throw new WsException("Invalid token");

    client["user"] = userToken;
    console.log(userToken.id);

    return true;
  }
}
