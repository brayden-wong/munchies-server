import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GUARDS } from "@/utils/constants";

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(GUARDS.GOOGLE) {
  constructor() {
    super();
  }
}
