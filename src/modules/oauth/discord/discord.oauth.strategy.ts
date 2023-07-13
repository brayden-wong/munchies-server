import { STRATEGIES } from "@/utils";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-discord";
import { Done } from "./discord.types";

@Injectable()
export class DiscordOAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.DISCORD,
) {
  constructor() {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["identify", "email"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profileData: Profile,
    done: Done,
  ) {
    const profile = {
      providerId: profileData.id,
      username: profileData.username,
      email: profileData.email,
      provider: profileData.provider,
    };

    done(null, profile);
  }
}
