import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

@Injectable()
export class HashService {
  async hash(value: string, salt = 10) {
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string) {
    return await bcrypt.compare(value, hash);
  }
}
