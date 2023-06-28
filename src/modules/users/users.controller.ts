import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./users.types";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  async getUser(@Param("id") id: string) {
    const result = await this.usersService.getUser({ query: "id", value: id });

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();

    if (!users)
      return {
        status: "error",
        statusCode: 500,
        message: "Error retrieving users",
      };

    return {
      status: "ok",
      statusCode: 200,
      data: users,
    };
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.updateUser(id, updateUserDto);

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Patch("activate/:id")
  async activateUser(@Param("id") id: string) {
    const result = await this.usersService.activateUser(id);

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Patch("deactivate/:id")
  async deactivateUser(@Param("id") id: string) {
    const result = await this.usersService.deactivateUser(id);

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    const result = await this.usersService.deleteUser(id);

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }
}
