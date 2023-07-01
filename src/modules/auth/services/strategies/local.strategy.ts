import { STRATEGIES } from "@/utils/constants";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.LOCAL,
) {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super({});
  }

  async validate(username: string, pass: string) {
    const user = await this.authService.validateUser(username, pass);

    if (!user)
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);

    return { id: user.id };
  }
}
