import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const User = createParamDecorator(
  (data: keyof Express.User, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    return data ? request.user?.[data] : request.user;
  },
);
