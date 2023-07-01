import { Module } from "@nestjs/common";
import { GoogleModule } from "./google";
import { FacebookModule } from "./facebook";

@Module({
  imports: [FacebookModule, GoogleModule],
})
export class OAuthModule {}
