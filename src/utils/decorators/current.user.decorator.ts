import type { DiscordProfile } from "@/modules/oauth/discord/";
import type { FacebookUser } from "@/modules/oauth/facebook";
import type { GoogleUser } from "@/modules/oauth/google";
import { User } from "@/modules/users";
import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const CurrentUser = createParamDecorator(
  (
    data: {
      user: "User" | "GoogleUser" | "FacebookUser";
      key:
        | keyof User
        | keyof GoogleUser
        | keyof FacebookUser
        | keyof DiscordProfile;
    },
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest<Request>();

    if (data.user === "User") {
      const user = request.user as User;
      const key = data.key as keyof User;

      return data.key ? user[key] : user;
    }

    if (data.user === "GoogleUser") {
      const user = request.user as GoogleUser;
      const key = data.key as keyof GoogleUser;

      return data.key ? user[key] : user;
    }

    if (data.user === "FacebookUser") {
      const user = request.user as FacebookUser;
      const key = data.key as keyof FacebookUser;

      return data.key ? user[key] : user;
    }

    if (data.user === "DiscordProfile") {
      const user = request.user as DiscordProfile;
      const key = data.key as keyof DiscordProfile;

      return data.key ? user[key] : user;
    }
  },
);
