CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(36) PRIMARY KEY DEFAULT 'vncup1dwoy1jai3or8sjabsimxo70ne7e1e5' NOT NULL,
	"refreshToken" varchar(255) NOT NULL,
	"expiration" timestamp NOT NULL,
	"userId" varchar(36) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(36) PRIMARY KEY DEFAULT 'r0c19lxcica4dfbzopfrjpgkkdrglhopp0gu' NOT NULL,
	"name" varchar(60) NOT NULL,
	"email" varchar(60) NOT NULL,
	"password" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tokenIndex" ON "sessions" ("refreshToken");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "userIndex" ON "sessions" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIndex" ON "users" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
