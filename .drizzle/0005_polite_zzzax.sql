CREATE TABLE IF NOT EXISTS "recipes" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(60) NOT NULL,
	"description" text NOT NULL,
	"ingredients" json NOT NULL,
	"steps" json NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersToRecipes" (
	"userId" varchar(36) NOT NULL,
	"recipeId" varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "usersToRecipes" ADD CONSTRAINT "usersToRecipes_userId_recipeId" PRIMARY KEY("userId","recipeId");
--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "accountId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToRecipes" ADD CONSTRAINT "usersToRecipes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToRecipes" ADD CONSTRAINT "usersToRecipes_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
