import { Module } from "@nestjs/common";
import { DiscordModule } from "./discord";
import { GoogleModule } from "./google";
import { FacebookModule } from "./facebook";

@Module({
  imports: [DiscordModule, FacebookModule, GoogleModule],
})
export class OAuthModule {}
