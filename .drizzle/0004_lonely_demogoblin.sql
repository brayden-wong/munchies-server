ALTER TYPE "provider" ADD VALUE 'discord';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;