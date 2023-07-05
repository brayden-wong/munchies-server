import { messages } from "@/modules/drizzle/schemas";
import { InferModel } from "drizzle-orm";

export type CreateMessageDto = InferModel<typeof messages, "insert">;
export type Message = InferModel<typeof messages, "select">;
