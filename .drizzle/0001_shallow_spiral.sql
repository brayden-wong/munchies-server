ALTER TABLE "sessions" ALTER COLUMN "id" SET DEFAULT 'bpqu5yll9b99x8fhzddj5m69t22jddpb337k';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT 'lauhjdsdlo2yd1g0dapjtr897pwebh6qm7hn';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deactivated" boolean DEFAULT false NOT NULL;