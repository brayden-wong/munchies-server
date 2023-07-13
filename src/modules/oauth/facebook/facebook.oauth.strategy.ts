import { STRATEGIES } from "@/utils";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { FacebookUser } from "./facebook.types";

@Injectable()
export class FacebookOAuthStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.FACEBOOK,
) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_ID,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "name", "photos", "email"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user: FacebookUser, info?: any) => void,
  ) {
    const user: FacebookUser = {
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      picture: profile.photos[0].value,
      provider: "facebook",
      providerId: profile.id,
    };

    done(null, user);
  }
}
