import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Database, InjectDrizzle, sessions } from "../drizzle";
import type {
  CreateSessionParams,
  UpdateSessionParams,
} from "./sessions.types";
import { eq } from "drizzle-orm";
import { cuid } from "@/utils";
import { HashService } from "../utils";

@Injectable()
export class SessionsService {
  constructor(
    @Inject(HashService) private readonly hashService: HashService,
    @InjectDrizzle() private readonly db: Database,
  ) {}

  async createSession(createSessionDto: CreateSessionParams) {
    const expiration = await this.generateExpiration();
    const { userId, refreshToken: rt } = createSessionDto;

    const id = cuid();

    const refreshToken = await this.hashService.hash(rt);
    const [session] = await this.db
      .insert(sessions)
      .values({ expiration, id, refreshToken, userId })
      .returning();

    return session;
  }

  async validateSession(userId: string) {
    const session = await this.db.query.sessions.findFirst({
      where: eq(sessions.userId, userId),
    });

    if (session.expiration < new Date()) return false;

    return session ? true : false;
  }

  async updateSession(userId: string, updateSessionDto: UpdateSessionParams) {
    try {
      const expiration = await this.generateExpiration();

      if (updateSessionDto.type === "login") {
        const session = await this.db.transaction(async (tx) => {
          const result = await tx.query.sessions.findFirst({
            where: eq(sessions.userId, userId),
          });

          if (!result) throw new Error("Session does not exist");

          const refreshToken = await this.hashService.hash(
            updateSessionDto.refreshToken,
          );

          const [session] = await tx
            .update(sessions)
            .set({
              expiration,
              refreshToken,
            })
            .where(eq(sessions.userId, userId))
            .returning();

          return session;
        });

        return session;
      }

      const session = await this.db.transaction(async (tx) => {
        const result = await tx.query.sessions.findFirst({
          where: eq(sessions.userId, userId),
        });

        if (!result) throw new Error("Session not found");

        if (
          !(await this.hashService.compare(
            updateSessionDto.oldRefreshToken,
            result.refreshToken,
          ))
        )
          throw new Error("Not authorized");

        const refreshToken = await this.hashService.hash(
          updateSessionDto.newRefreshToken,
        );

        const [session] = await tx
          .update(sessions)
          .set({ expiration, refreshToken })
          .where(eq(sessions.userId, userId))
          .returning();

        return session;
      });

      return session;
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  private async generateExpiration() {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  }
}
