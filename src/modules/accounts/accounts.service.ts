import { Injectable } from "@nestjs/common";
import { Database, InjectDrizzle, accounts, users } from "@/modules/drizzle";
import type { AccountExistsParams, CreateAccountDto } from "./accounts.types";
import { eq } from "drizzle-orm";

@Injectable()
export class AccountsService {
  constructor(
    @InjectDrizzle()
    private readonly db: Database,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    const [account] = await this.db
      .insert(accounts)
      .values(createAccountDto)
      .returning();

    return account;
  }

  async getAccount({ query, value }: AccountExistsParams) {
    const queryResult = await this.parseQuery({ query, value });

    const account = await this.db.query.accounts.findFirst({
      where: queryResult,
    });

    return account;
  }

  async accountExists({ query, value }: AccountExistsParams) {
    const queryResult = await this.parseQuery({ query, value });

    const result = await this.db.query.accounts.findFirst({
      where: queryResult,
      columns: { userId: true },
    });

    return result
      ? { exists: true, id: result.userId }
      : { exists: false, id: null };
  }

  private async parseQuery({ query, value }: AccountExistsParams) {
    return query === "providerId"
      ? eq(accounts.providerId, value)
      : eq(accounts.userId, value);
  }
}
