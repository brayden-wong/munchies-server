import { Injectable } from "@nestjs/common";
import {
  adjectives,
  Config,
  nouns,
  uniqueUsernameGenerator,
} from "unique-username-generator";
import "node-window-polyfill/register";
import "window-crypto";

@Injectable()
export class GeneratorService {
  private readonly usernameConfig: Config;

  constructor() {
    this.usernameConfig = {
      dictionaries: [adjectives, nouns],
      style: "lowerCase",
      randomDigits: 2,
      length: 16,
    };
  }

  async generateUsername() {
    return uniqueUsernameGenerator(this.usernameConfig);
  }
}
