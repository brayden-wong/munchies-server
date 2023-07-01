import { InferModel, SQL } from "drizzle-orm";
import { users } from "@/modules/drizzle";

export type CreateUserDto = InferModel<typeof users, "insert">;
export type UpdateUserDto = Partial<InferModel<typeof users, "select">>;
export type User = InferModel<typeof users, "select">;

export type FindOneParams = {
  query: "email" | "id" | "username";
  value: string;
};
