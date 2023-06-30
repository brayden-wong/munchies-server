import { Database, InjectDrizzle } from "@/modules/drizzle";
import { SessionsService } from "@/modules/sessions";
import { UsersService } from "@/modules/users";
import { GeneratorService } from "@/modules/utils";
import { GoogleProfile, GoogleUser, cuid } from "@/utils";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { accounts } from "@/modules/drizzle/schemas/accounts";

@Injectable()
export class GoogleService {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(GeneratorService)
    private readonly generatorService: GeneratorService,
    @Inject(SessionsService)
    private readonly sessionsService: SessionsService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @InjectDrizzle() private readonly db: Database,
  ) {}

  async createProfile(profile: GoogleUser) {
    const userExists = await this.usersService.userExists({
      query: "email",
      value: profile.email,
    });

    if (userExists)
      throw new HttpException("User already exists", HttpStatus.CONFLICT);

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

    const [account] = await this.db
      .insert(accounts)
      .values({
        id: accountId,
        provider,
        providerId,
        userId,
      })
      .returning();

    return { user: newUser, session, account };
  }
}
