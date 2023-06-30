import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./users.types";
import { Public, UserId } from "@/utils";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUser(@UserId() id: string) {
    console.log(id);
    const result = await this.usersService.getUser({ query: "id", value: id });

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Public()
  @Get("all")
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

  @Patch()
  async updateUser(@UserId() id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.updateUser(id, updateUserDto);

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Patch("activate")
  async activateUser(@UserId() id: string) {
    const result = await this.usersService.activateUser(id);

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Patch("deactivate")
  async deactivateUser(@UserId() id: string) {
    const result = await this.usersService.deactivateUser(id);

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Public()
  @Delete(":id")
  // async deleteUser(@UserId() id: string) {
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
