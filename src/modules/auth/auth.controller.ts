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
import { Public, User, UserId } from "@/utils/decorators";
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
  @Post("login")
  @UseGuards(LocalGuard)
  async login(@UserId() userId: string) {
    const { at, rt, session } = await this.authService.login(userId);

    return {
      status: "ok",
      statusCode: HttpStatus.OK,
      data: {
        at,
        rt,
        session,
      },
    };
  }

  @Public()
  @Patch("refresh")
  @UseGuards(RtGuard)
  async refreshToken(@User() user: RefreshToken) {
    const { at, rt, session } = await this.authService.refreshToken(
      user.rt,
      user.id,
    );

    return {
      status: "ok",
      statusCode: HttpStatus.OK,
      data: {
        at,
        rt,
        session,
      },
    };
  }
}
