import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { SessionsService } from "@/modules/sessions";
import { UsersService } from "@/modules/users";
import { HashService } from "@/modules/utils";
import { isValidEmail } from "@/utils/functions";
import type { Token } from "@/utils/types";

@Injectable()
export class AuthService {
  constructor(
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(HashService) private readonly hashService: HashService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(SessionsService) private readonly sessionsService: SessionsService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string) {
    const isValid = isValidEmail(username);

    const user = isValid
      ? await this.usersService.getUser({ query: "email", value: username })
      : await this.usersService.getUser({ query: "username", value: username });

    if (!user) return null;

    if (!(await this.hashService.compare(pass, user.password))) return null;

    return { id: user.id };
  }

  async login(userId: string) {
    const isValidSession = await this.sessionsService.validateSession(userId);

    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const session = isValidSession
      ? await this.sessionsService.updateSession(userId, {
          type: "login",
          userId,
          refreshToken: refreshToken,
        })
      : await this.sessionsService.createSession({
          userId,
          refreshToken: refreshToken,
        });

    if (!session)
      throw new HttpException(
        "Failed to create session",
        HttpStatus.BAD_REQUEST,
      );

    return { accessToken, refreshToken, session };
  }

  async validateToken(
    token: string,
    options: { type: "at" | "rt" } = { type: "at" },
  ) {
    const decoded: Token = await this.jwtService.verifyAsync(token, {
      secret:
        options.type === "at"
          ? this.config.get<string>("AT_SECRET")
          : this.config.get<string>("RT_SECRET"),
    });

    const user = await this.usersService.getUser({
      query: "id",
      value: decoded.id,
    });

    if (!user) return null;

    return decoded;
  }

  async refreshToken(userId: string, refresh_token: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const session = await this.sessionsService.updateSession(userId, {
      type: "refresh",
      newRefreshToken: refreshToken,
      oldRefreshToken: refresh_token,
      userId,
    });

    if (!session) throw new HttpException("Invalid refresh token", 401);

    return { accessToken, refreshToken, session };
  }

  private async generateTokens(id: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id },
        {
          expiresIn: this.config.get<string>("AT_EXP"),
          secret: this.config.get<string>("AT_SECRET"),
        },
      ),
      this.jwtService.signAsync(
        { id },
        {
          expiresIn: this.config.get<string>("RT_EXP"),
          secret: this.config.get<string>("RT_SECRET"),
        },
      ),
    ]);

    return { accessToken, refreshToken } as const;
  }
}
