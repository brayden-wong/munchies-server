import { ConflictException, Inject, Injectable } from "@nestjs/common";

import { AccountsService } from "@/modules/accounts";
import { AuthService } from "@/modules/auth";
import { GeneratorService } from "@/modules/utils";
import { UsersService } from "@/modules/users";

import { cuid } from "@/utils/functions";
import type { FacebookUser } from "./facebook.types";

@Injectable()
export class FacebookService {
  constructor(
    @Inject(AccountsService)
    private readonly accountsService: AccountsService,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(GeneratorService)
    private readonly generatorService: GeneratorService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async createProfile(profile: FacebookUser) {
    const { exists, id: existingUserId } =
      await this.accountsService.accountExists({
        query: "providerId",
        value: profile.providerId,
      });

    if (exists) {
      const existingAccount = await this.accountsService.getAccount({
        query: "userId",
        value: existingUserId,
      });

      if (existingAccount.provider !== "facebook")
        throw new ConflictException(
          "Email is already associated with another account",
        );
      const { accessToken, refreshToken } = await this.authService.login(
        existingUserId,
      );

      return {
        auth: { accessToken, refreshToken },
        user: existingAccount.users,
      };
    }

    const userId = cuid();
    const accountId = cuid();
    const username = await this.generatorService.generateUsername();

    const { name, picture, providerId, provider } = profile;

    const user = await this.usersService.createUser({
      id: userId,
      username,
      name,
      avatar: picture,
    });

    const session = await this.authService.login(user.id);

    await this.accountsService.createAccount({
      id: accountId,
      provider,
      providerId,
      userId,
    });

    return { auth: session, user };
  }
}
