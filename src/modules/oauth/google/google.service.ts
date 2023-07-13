import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AccountsService } from "@/modules/accounts";
import { AuthService } from "@/modules/auth";
import { UsersService } from "@/modules/users";
import { GeneratorService } from "@/modules/utils";

import { cuid } from "@/utils/functions";
import type { CreateProfileReturnType, GoogleUser } from "./google.types";

@Injectable()
export class GoogleService {
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

  async createProfile(profile: GoogleUser): Promise<CreateProfileReturnType> {
    const { exists, id: existingUserId } = await this.usersService.userExists({
      query: "email",
      value: profile.email,
    });

    if (exists) {
      const existingAccount = await this.accountsService.getAccount({
        query: "userId",
        value: existingUserId,
      });

      if (existingAccount.provider !== "google")
        throw new HttpException(
          "Email is already associated with another account",
          HttpStatus.CONFLICT,
        );
      const { at, rt, session } = await this.authService.login(existingUserId);

      return { user: null, account: null, auth: { at, rt, session } };
    }

    const userId = cuid();
    const accountId = cuid();
    const username = await this.generatorService.generateUsername();

    const { providerId, email, provider, picture: _, name } = profile;

    const user = {
      id: userId,
      username,
      email: email.toLowerCase(),
      name,
    };

    const newUser = await this.usersService.createUser(user);

    const session = await this.authService.login(user.id);

    const account = await this.accountsService.createAccount({
      id: accountId,
      provider,
      providerId,
      userId,
    });

    return { account, auth: session, user: newUser };
  }
}
