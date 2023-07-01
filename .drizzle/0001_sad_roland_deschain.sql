DO $$ BEGIN
 CREATE TYPE "provider" AS ENUM('google', 'facebook', 'twitter');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_accountId_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_sessionId_sessions_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "accountId";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "sessionId";