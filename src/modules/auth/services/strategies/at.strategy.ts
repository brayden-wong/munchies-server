import { STRATEGIES, Token } from "@/utils";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, STRATEGIES.AT) {
  constructor(
    @Inject(ConfigService)
    private readonly _config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get<string>("AT_SECRET"),
    });
  }

  async validate(payload: Token) {
    return payload;
  }
}
