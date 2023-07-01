import { Account } from "@/modules/accounts";
import { Session } from "@/modules/sessions";
import { User } from "@/modules/users";

export type GoogleProfile = {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: { value: string; verfiied: boolean }[];
  photos: { value: string }[];
  provider: "google";
};

export type GoogleUser = {
  provider: "google";
  providerId: string;
  email: string;
  name: string;
  picture: string;
};

export type CreateProfileReturnType = SignedUpGoogleUser | SignedInGoogleUser;
type SignedInGoogleUser = {
  user: null;
  account: null;
  auth: {
    at: string;
    rt: string;
    session: Session;
  };
};

type SignedUpGoogleUser = {
  user: User;
  account: Account;
  auth: {
    at: string;
    rt: string;
    session: Session;
  };
};
