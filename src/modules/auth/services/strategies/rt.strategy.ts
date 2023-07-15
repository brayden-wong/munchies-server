import { STRATEGIES, Token } from "@/utils";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, STRATEGIES.RT) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.RT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Token) {
    const rt = req.headers.authorization.split(" ")[1];
    console.log("refresh token", rt);
    console.log("payload", payload);
    return {
      ...payload,
      rt,
    };
  }
}
