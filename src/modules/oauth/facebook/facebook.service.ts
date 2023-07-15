import { AccountsService, GeneratorService, UsersService } from "@/modules";
import { AuthService } from "@/modules/auth";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
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
      const existingAccount = await this.accountsService.getAccount({
        query: "userId",
        value: existingUserId,
      });

      if (existingAccount.provider !== "facebook")
        throw new ConflictException(
          "Email is already associated with another account",
        );
      const { at, rt, session } = await this.authService.login(existingUserId);

      return { auth: { at, rt, session }, user: existingAccount.users };
    }

    const userId = cuid();
    const accountId = cuid();
    const username = await this.generatorService.generateUsername();

    const { name, picture: _, providerId, provider } = profile;

    const user = {
      id: userId,
      username,
      name,
    };

    const newUser = await this.usersService.createUser(user);

    const session = await this.authService.login(newUser.id);

    await this.accountsService.createAccount({
      id: accountId,
      provider,
      providerId,
      userId,
    });

    return { auth: session, user: newUser };
  }
}
