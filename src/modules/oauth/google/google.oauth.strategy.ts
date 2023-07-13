import { STRATEGIES } from "@/utils";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import type { GoogleProfile, GoogleUser } from "./google.types";

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.GOOGLE,
) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    const { emails, photos, id, provider, displayName } = profile;

    const user: GoogleUser = {
      provider: provider,
      providerId: id,
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
