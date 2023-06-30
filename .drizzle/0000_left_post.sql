CREATE TYPE provider AS ENUM ('facebook', 'google', 'twitter');

CREATE TABLE IF NOT EXISTS "accounts" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"provider" provider NOT NULL,
	"providerId" varchar(255) NOT NULL,
	"userId" varchar(36) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"refreshToken" varchar(255) NOT NULL,
	"expiration" timestamp NOT NULL,
	"userId" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(60) NOT NULL,
	"username" varchar(16) NOT NULL,
	"email" varchar(60) NOT NULL,
	"password" varchar(255),
	"deactivated" boolean DEFAULT false NOT NULL,
	"accountId" varchar(36),
	"sessionId" varchar(36),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tokenIndex" ON "sessions" ("refreshToken");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "userIndex" ON "sessions" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "usernameIndex" ON "users" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIndex" ON "users" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_sessionId_sessions_id_fk" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
