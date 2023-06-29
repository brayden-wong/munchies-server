import { GUARDS } from "@/utils/constants";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalGuard extends AuthGuard(GUARDS.LOCAL) {
  constructor() {
    super();
  }
}
