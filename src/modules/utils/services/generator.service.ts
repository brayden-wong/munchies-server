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
  async generateUsername(
    config: Config = {
      dictionaries: [adjectives, nouns],
      randomDigits: 5,
      length: 24,
      separator: " ",
    },
  ) {
    return await this.transformName(uniqueUsernameGenerator(config));
  }

  async generateRoomName(
    config: Config = {
      dictionaries: [adjectives, nouns],
      randomDigits: 4,
      length: 24,
      separator: " ",
    },
  ) {
    return await this.transformName(uniqueUsernameGenerator(config));
  }

  private async transformName(value: string) {
    return value
      .split(" ")
      .map((str) => str[0].toUpperCase() + str.slice(1))
      .join("");
  }
}
