import { InferModel } from "drizzle-orm";
import { sessions } from "@/modules/drizzle";

export type CreateSessionParams = {
  userId: string;
  refreshToken: string;
};

// export type UpdateSessionParams = {
//   userId: string;
//   newRefreshToken: string;
//   oldRefreshToken: string;
// };

export type UpdateSessionParams = UpdateLoginSession | RefreshSessionToken;

type RefreshSessionToken = {
  type: "refresh";
  newRefreshToken: string;
  oldRefreshToken: string;
  userId: string;
};

type UpdateLoginSession = {
  type: "login";
  userId: string;
  refreshToken: string;
};

export type Session = InferModel<typeof sessions, "select">;
