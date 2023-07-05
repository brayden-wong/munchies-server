import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";

export const CurrentUserId = createParamDecorator(
  (data: undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToWs().getClient()["user"];

    return user["id"];
  },
);
