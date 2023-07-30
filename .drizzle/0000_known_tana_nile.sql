DO $$ BEGIN
 CREATE TYPE "provider" AS ENUM('google', 'facebook', 'discord');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"provider" "provider" NOT NULL,
	"providerId" varchar(255) NOT NULL,
	"userId" varchar(36) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friends" (
	"userId" varchar(36) NOT NULL,
	"friendId" varchar(36) NOT NULL,
	CONSTRAINT friends_userId_friendId PRIMARY KEY("userId","friendId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"authorId" varchar(36) NOT NULL,
	"roomId" varchar(36) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(60) NOT NULL,
	"description" text NOT NULL,
	"ingredients" json NOT NULL,
	"steps" json NOT NULL,
	"public" boolean DEFAULT false NOT NULL,
	"authorId" varchar(36),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(24) NOT NULL,
	"creatorId" varchar(36) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
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
	"name" varchar(60),
	"username" varchar(32) NOT NULL,
	"email" varchar(60),
	"password" varchar(255),
	"avatar" text,
	"active" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersToRecipes" (
	"userId" varchar(36) NOT NULL,
	"recipeId" varchar(36) NOT NULL,
	CONSTRAINT usersToRecipes_userId_recipeId PRIMARY KEY("userId","recipeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersToRooms" (
	"userId" varchar(36) NOT NULL,
	"roomId" varchar(36) NOT NULL,
	CONSTRAINT usersToRooms_userId_roomId PRIMARY KEY("userId","roomId")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "userIdIndex" ON "accounts" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "providerIdIndex" ON "accounts" ("providerId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nameIndex" ON "rooms" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tokenIndex" ON "sessions" ("refreshToken");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "userIndex" ON "sessions" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "usernameIndex" ON "users" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIndex" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idIndex" ON "usersToRecipes" ("userId","recipeId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friends" ADD CONSTRAINT "friends_friendId_users_id_fk" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooms" ADD CONSTRAINT "rooms_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToRooms" ADD CONSTRAINT "usersToRooms_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usersToRooms" ADD CONSTRAINT "usersToRooms_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
