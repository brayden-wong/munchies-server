import { STRATEGIES } from "@/utils";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import type { GoogleProfile } from "./google.types";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.GOOGLE,
) {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    super({
      clientID: config.get<string>("GOOGLE_CLIENT_ID"),
      clientSecret: config.get<string>("GOOGLE_SECRET"),
      callbackURL: config.get<string>("GOOGLE_CALLBACK_URL"),
      scope: ["email", "profile"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    const { emails, photos, id, provider, displayName, ...rest } = profile;

    const user: Express.GoogleUser = {
      provider: "google",
      providerId: id,
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
