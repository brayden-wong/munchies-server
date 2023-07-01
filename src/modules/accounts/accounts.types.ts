import { accounts } from "@/modules/drizzle/schemas";
import { InferModel } from "drizzle-orm";

export type CreateAccountDto = InferModel<typeof accounts, "insert">;
export type Account = InferModel<typeof accounts, "select">;

export type AccountExistsParams = {
  query: "providerId" | "userId";
  value: string;
};
