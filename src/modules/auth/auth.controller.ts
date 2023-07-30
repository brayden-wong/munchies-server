import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UsersService, type CreateUserDto } from "@/modules/users";
import { ROUTES } from "@/utils/constants";
import { AuthService } from "./services";
import { LocalGuard, RtGuard } from "./guards";
import { Public, CurrentUser, UserId } from "@/utils/decorators";
import { RefreshToken } from "@/utils";

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    if (!user) {
      throw new HttpException(
        {
          status: "error",
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Could not create user",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: "ok",
      statusCode: HttpStatus.CREATED,
      data: {
        user,
      },
    };
  }

  @Public()
  @UseGuards(LocalGuard)
  @Post("login")
  async login(@UserId() userId: string) {
    const { accessToken, refreshToken } = await this.authService.login(userId);

    return {
      status: "ok",
      statusCode: HttpStatus.OK,
      data: {
        accessToken,
        refreshToken,
        userId,
      },
    };
  }

  @Public()
  @UseGuards(RtGuard)
  @Patch("refresh")
  async refreshToken(
    @CurrentUser({ user: "RefreshToken" }) user: RefreshToken,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      user.id,
      user.rt,
    );

    return {
      status: "ok",
      statusCode: HttpStatus.OK,
      data: {
        accessToken,
        refreshToken,
        userId: user.id,
      },
    };
  }
}
