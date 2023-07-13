import { Injectable } from "@nestjs/common";
import { Database, InjectDrizzle, accounts } from "@/modules/drizzle";
import type {
  AccountExistsParams,
  CreateAccountDto,
  ParseQueryParams,
} from "./accounts.types";
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
      with: {
        users: {
          columns: {
            id: true,
            username: true,
            email: true,
            name: true,
          },
        },
      },
      where: queryResult,
    });

    return account;
  }

  async accountExists({ query, value }: ParseQueryParams) {
    const queryResult = await this.parseQuery({ query, value });

    const result = await this.db.query.accounts.findFirst({
      where: queryResult,
      columns: { userId: true },
    });

    return result
      ? { exists: true, id: result.userId }
      : { exists: false, id: null };
  }

  private async parseQuery({ query, value }: ParseQueryParams) {
    return query === "providerId"
      ? eq(accounts.providerId, value)
      : eq(accounts.userId, value);
  }
}
