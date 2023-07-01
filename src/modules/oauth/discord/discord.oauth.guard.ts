import { GUARDS } from "@/utils";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class DiscordOAuthGuard extends AuthGuard(GUARDS.DISCORD) {
  constructor() {
    super();
  }
}
