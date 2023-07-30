import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UsersService } from "@/modules/users";
import { AccountsService } from "@/modules/accounts";
import { AuthService } from "@/modules/auth";

import { DiscordProfile } from "./discord.types";
import { cuid } from "@/utils/functions";
@Injectable()
export class DiscordService {
  constructor(
    @Inject(AccountsService)
    private readonly accountsService: AccountsService,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async createProfile(profile: DiscordProfile) {
    const { exists, id: existingUserId } = await this.usersService.userExists({
      query: "email",
      value: profile.email,
    });

    if (exists) {
      const existingAccount = await this.accountsService.getAccount({
        query: "userId",
        value: existingUserId,
      });

      if (existingAccount.provider !== "discord")
        throw new ConflictException(
          "Email is already associated with another account",
        );

      const session = await this.authService.login(existingUserId);

      const { accessToken, refreshToken } = session;
      return {
        auth: { accessToken, refreshToken },
        user: existingAccount.users,
      };
    }

    const user = await this.usersService.createUser({
      id: cuid(),
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar,
    });

    const session = await this.authService.login(user.id);

    await this.accountsService.createAccount({
      id: cuid(),
      userId: user.id,
      provider: profile.provider,
      providerId: profile.providerId,
    });

    return {
      auth: session,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }
}
