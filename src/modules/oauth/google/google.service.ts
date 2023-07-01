import { Database, InjectDrizzle } from "@/modules/drizzle";
import { SessionsService } from "@/modules/sessions";
import { UsersService } from "@/modules/users";
import { GeneratorService } from "@/modules/utils";
import { cuid } from "@/utils/functions";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../../auth/services/auth.service";
import { accounts } from "@/modules/drizzle/schemas/accounts";

import type { CreateProfileReturnType, GoogleUser } from "./google.types";
import { AccountsService } from "@/modules/accounts";

@Injectable()
export class GoogleService {
  constructor(
    @Inject(AccountsService)
    private readonly accountsService: AccountsService,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(GeneratorService)
    private readonly generatorService: GeneratorService,
    @Inject(SessionsService)
    private readonly sessionsService: SessionsService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async createProfile(profile: GoogleUser): Promise<CreateProfileReturnType> {
    const { exists, id: existingUserId } = await this.usersService.userExists({
      query: "email",
      value: profile.email,
    });

    console.table([exists, existingUserId]);

    if (exists) {
      const { at, rt, session } = await this.authService.login(existingUserId);

      return { user: null, account: null, auth: { at, rt, session } };
    }

    const userId = cuid();
    const accountId = cuid();
    const username = await this.generatorService.generateUsername();

    const { providerId, email, provider, picture, name } = profile;

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

    const userAccountId = await this.accountsService.linkAccount(
      newUser.id,
      accountId,
    );

    newUser.accountId = userAccountId;

    return { account, auth: session, user: newUser };
  }
}
