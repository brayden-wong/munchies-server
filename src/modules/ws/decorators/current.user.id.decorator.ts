import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";

export const CurrentUserId = createParamDecorator(
  (_data: undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToWs().getClient()["user"];

    return user["id"];
  },
);
