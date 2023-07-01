import { emailRegex } from "../constants";

export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};
