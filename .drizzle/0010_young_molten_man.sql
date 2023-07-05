ALTER TABLE "rooms" ADD COLUMN "creatorId" varchar(36) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooms" ADD CONSTRAINT "rooms_creatorId_users_id_fk" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
