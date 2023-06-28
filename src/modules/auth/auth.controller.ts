import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import { UsersService, type CreateUserDto } from "@/modules/users";
import { ROUTES } from "@/utils/constants";
import { AuthService } from "./services";

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

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
}
