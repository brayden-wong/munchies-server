import {
  AccountsService,
  GeneratorService,
  SessionsService,
  UsersService,
} from "@/modules";
import { AuthService } from "@/modules/auth";
import { Inject, Injectable } from "@nestjs/common";
import type { FacebookUser } from "./facebook.types";
import { cuid } from "@/utils/functions";

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
      const { at, rt, session } = await this.authService.login(existingUserId);

      return { user: null, account: null, auth: { at, rt, session } };
    }

    const userId = cuid();
    const accountId = cuid();
    const username = await this.generatorService.generateUsername();

    const { name, picture, providerId, provider } = profile;

    const user = {
      id: userId,
      username,
      name,
    };

    const newUser = await this.usersService.createUser(user);

    const session = await this.authService.login(newUser.id);

    const account = await this.accountsService.createAccount({
      id: accountId,
      provider,
      providerId,
      userId,
    });

    return { account, auth: session, user: newUser };
  }
}
