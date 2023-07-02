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
      randomDigits: 3,
      length: 32,
      separator: " ",
    };
  }

  async generateUsername() {
    const username = uniqueUsernameGenerator(this.usernameConfig)
      .split(" ")
      .map((str) => str[0].toUpperCase() + str.slice(1))
      .join("");

    return username;
  }
}
