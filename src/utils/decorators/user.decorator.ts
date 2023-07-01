import { FacebookUser } from "@/modules/oauth/facebook";
import { GoogleUser } from "@/modules/oauth/google";
import { User as UserData } from "@/modules/users";
import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const User = createParamDecorator(
  (
    data: keyof UserData | keyof GoogleUser | keyof FacebookUser,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest<Request>();

    return data ? request.user?.[data] : request.user;
  },
);
