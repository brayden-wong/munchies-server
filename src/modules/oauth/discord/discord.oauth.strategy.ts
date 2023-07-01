import { STRATEGIES } from "@/utils";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-discord";
import { Done } from "./discord.types";

@Injectable()
export class DiscordOAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.DISCORD,
) {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    super({
      clientID: config.get<string>("DISCORD_CLIENT_ID"),
      clientSecret: config.get<string>("DISCORD_CLIENT_SECRET"),
      callbackURL: config.get<string>("DISCORD_CALLBACK_URL"),
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
