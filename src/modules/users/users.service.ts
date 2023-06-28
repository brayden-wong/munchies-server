import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { InjectDrizzle, users } from "@/modules/drizzle";
import { CreateUserDto, FindOneParams, UpdateUserDto } from "./users.types";

import type { Database } from "@/modules/drizzle";
import { HashService } from "../utils";
import { and, eq, isNull } from "drizzle-orm";

@Injectable()
export class UsersService {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    @Inject(HashService) private readonly hashService: HashService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    console.table(createUserDto);
    const { password, email, ...userDetails } = createUserDto;

    try {
      const user = await this.db.transaction(async (tx) => {
        const lowerCaseEmail = email.toLowerCase();

        const [existingUser] = await tx
          .select()
          .from(users)
          .where(eq(users.email, lowerCaseEmail))
          .limit(1)
          .execute();

        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await this.hashService.hash(password, 10);

        const [result] = await tx
          .insert(users)
          .values({
            ...userDetails,
            email: lowerCaseEmail,
            password: hashedPassword,
          })
          .returning();

        const { password: returningPassword, ...user } = result;

        return user;
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }

  async getUser({ query, value }: FindOneParams) {
    const queryResult = await this.parseQuery({ query, value });

    const [result] = await this.db
      .select()
      .from(users)
      .where(queryResult)
      .execute();

    return result;
  }

  async getUsers() {
    return await this.db.select().from(users);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.db.transaction(async (tx) => {
        const result = await tx.query.users.findFirst({
          where: eq(users.id, id),
          columns: { id: true },
        });

        if (!result) throw new Error("User not found");

        if (updateUserDto.password)
          updateUserDto.password = await this.hashService.hash(
            updateUserDto.password,
          );

        if (updateUserDto.email)
          updateUserDto.email = updateUserDto.email.toLowerCase();

        const [updatedUser] = await tx
          .update(users)
          .set({
            ...updateUserDto,
            updatedAt: new Date(),
          })
          .where(eq(users.id, id))
          .returning();

        return updatedUser;
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  async activateUser(id: string) {
    try {
      const user = await this.db.transaction(async (tx) => {
        const result = await tx.query.users.findFirst({
          where: eq(users.id, id),
          columns: { id: true },
        });

        if (!result) throw new Error("User not found");

        const [activatedUser] = await tx
          .update(users)
          .set({ updatedAt: new Date(), deactivate: false })
          .where(eq(users.id, id))
          .returning();

        return activatedUser;
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  async deactivateUser(id: string) {
    try {
      const user = await this.db.transaction(async (tx) => {
        const result = await tx.query.users.findFirst({
          where: eq(users.id, id),
          columns: { id: true },
        });

        if (!result) throw new Error("User not found");

        const [deactivatedUser] = await tx
          .update(users)
          .set({ updatedAt: new Date(), deactivate: true })
          .where(eq(users.id, id))
          .returning();

        return deactivatedUser;
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.db.transaction(async (tx) => {
        const result = await tx.query.users.findFirst({
          columns: { id: true },
          where: eq(users.id, id),
        });

        if (!result) throw new Error("User not found");

        const [deletedUser] = await tx
          .delete(users)
          .where(eq(users.id, id))
          .returning();

        return deletedUser;
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  private async parseQuery({ query, value }: FindOneParams) {
    const result =
      query === "email"
        ? and(eq(users.email, value), isNull(users.deletedAt))
        : and(eq(users.id, value), isNull(users.deletedAt));

    return result;
  }
}
