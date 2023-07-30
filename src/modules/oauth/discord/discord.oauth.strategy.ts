import { STRATEGIES } from "@/utils";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-discord";
import { Done, Profile } from "./discord.types";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DiscordOAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.DISCORD,
) {
  constructor(
    @Inject(ConfigService)
    private readonly _config: ConfigService,
  ) {
    super({
      clientID: _config.get<string>("DISCORD_CLIENT_ID"),
      clientSecret: _config.get<string>("DISCORD_CLIENT_SECRET"),
      callbackURL: _config.get<string>("DISCORD_CALLBACK_URL"),
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
      avatar: `https://cdn.discordapp.com/avatars/${profileData.id}/${profileData.avatar}`,
      provider: profileData.provider,
    };

    done(null, profile);
  }
}
