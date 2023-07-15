import type { DiscordProfile } from "@/modules/oauth/discord/";
import type { FacebookUser } from "@/modules/oauth/facebook";
import type { GoogleUser } from "@/modules/oauth/google";
import { User } from "@/modules/users";
import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { RefreshToken } from "../types";

export const CurrentUser = createParamDecorator(
  (
    data: {
      user:
        | "User"
        | "GoogleUser"
        | "FacebookUser"
        | "DiscordUser"
        | "RefreshToken";
      key?:
        | keyof User
        | keyof GoogleUser
        | keyof FacebookUser
        | keyof DiscordProfile
        | keyof RefreshToken;
    } = { user: "User", key: null },
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

    if (data.user === "DiscordUser") {
      const user = request.user as DiscordProfile;
      const key = data.key as keyof DiscordProfile;

      return data.key ? user[key] : user;
    }

    if (data.user === "RefreshToken") {
      const user = request.user as RefreshToken;
      const key = data.key as keyof RefreshToken;

      return data.key ? user[key] : user;
    }
  },
);
