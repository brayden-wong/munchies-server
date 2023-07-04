import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Token } from "@/utils/types";

export const CurrentUser = createParamDecorator(
  (data: keyof Token | undefined, ctx: ExecutionContext) => {
    const user: Token = ctx.switchToWs().getClient()["user"];

    return data ? user[data] : user;
  },
);
