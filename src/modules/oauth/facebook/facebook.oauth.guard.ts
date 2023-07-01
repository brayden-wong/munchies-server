import { GUARDS } from "@/utils";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FacebookOAuthGuard extends AuthGuard(GUARDS.FACEBOOK) {
  constructor() {
    super();
  }
}
