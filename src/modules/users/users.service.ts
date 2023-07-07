import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { InjectDrizzle, accounts, sessions, users } from "@/modules/drizzle";
import { CreateUserDto, FindOneParams, UpdateUserDto } from "./users.types";

import type { Database } from "@/modules/drizzle";
import { HashService } from "../utils";
import { and, asc, eq, isNull, like } from "drizzle-orm";
import { cuid } from "@/utils";

@Injectable()
export class UsersService {
  constructor(
    @InjectDrizzle() private readonly db: Database,
    @Inject(HashService) private readonly hashService: HashService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.db.transaction(async (tx) => {
        if (createUserDto.email)
          createUserDto.email = createUserDto.email.toLowerCase();

        const [existingUser] = await tx
          .select()
          .from(users)
          .where(
            createUserDto.email
              ? eq(users.email, createUserDto.email.toLowerCase())
              : eq(users.username, createUserDto.username),
          )
          .limit(1)
          .execute();

        if (existingUser) {
          throw new Error("User already exists");
        }

        const id = cuid();
        if (createUserDto.password)
          createUserDto.password = await this.hashService.hash(
            createUserDto.password,
          );

        const [result] = await tx
          .insert(users)
          .values({
            id,
            ...createUserDto,
          })
          .returning();

        return result;
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
      .orderBy(asc(users.username))
      .execute();

    return result;
  }

  async getUsers() {
    return await this.db
      .select()
      .from(users)
      .orderBy(asc(users.username))
      .execute();
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
        const result = await this.db.query.users.findFirst({
          columns: { id: true },
          where: (users, { eq }) => eq(users.id, id),
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

  async userExists({ query, value }: FindOneParams) {
    const queryResult = await this.parseQuery({ query, value });

    const result = await this.db.query.users.findFirst({
      columns: { id: true },
      where: queryResult,
    });

    return result
      ? { exists: true, id: result.id }
      : { exists: false, id: null };
  }

  private async deleteAccount(accountId: string) {
    await this.db.delete(accounts).where(eq(accounts.id, accountId)).execute();
  }

  private async deleteSession(sessionId: string) {
    await this.db.delete(sessions).where(eq(sessions.id, sessionId)).execute();
  }

  private async parseQuery({ query, value }: FindOneParams) {
    const result =
      query === "email"
        ? and(eq(users.email, value), isNull(users.deletedAt))
        : query === "username"
        ? and(eq(users.username, value), isNull(users.deletedAt))
        : and(eq(users.id, value), isNull(users.deletedAt));

    return result;
  }
}
