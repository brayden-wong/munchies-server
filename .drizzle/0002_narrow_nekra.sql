ALTER TABLE "users" ALTER COLUMN "username" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "accountId" varchar(36);