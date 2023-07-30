import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./users.types";
import { Public, UserId } from "@/utils";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get("query")
  async getUserByQuery(@Query("userId") userId: string) {
    console.log("query hit");
    const result = await this.usersService.getProfile({
      query: "id",
      value: userId,
    });

    console.log(result);

    if (!result)
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return {
      status: "ok",
      statusCode: 200,
      data: result,
    };
  }

  @Get()
  async getUser(@UserId() id: string) {
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
  @Delete()
  // async deleteUser(@UserId() userId: string) {
  async deleteUser(@Param("id") userId: string) {
    return await this.usersService.deleteUser(userId);

    // if (!result)
    //   throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    // return {
    //   status: "ok",
    //   statusCode: 200,
    //   data: result,
    // };
  }
}
