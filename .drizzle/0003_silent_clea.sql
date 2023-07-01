CREATE UNIQUE INDEX IF NOT EXISTS "userIdIndex" ON "accounts" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "providerIdIndex" ON "accounts" ("providerId");