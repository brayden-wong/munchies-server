CREATE TABLE IF NOT EXISTS "messages" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"content" text,
	"authorId" varchar(36) NOT NULL,
	"roomId" varchar(36) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(24) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersToRooms" (
	"userId" varchar(36) NOT NULL,
	"roomId" varchar(36) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "usersToRooms" ADD CONSTRAINT "usersToRooms_userId_roomId" PRIMARY KEY("userId","roomId");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nameIndex" ON "rooms" ("name");--> statement-breakpoint
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
