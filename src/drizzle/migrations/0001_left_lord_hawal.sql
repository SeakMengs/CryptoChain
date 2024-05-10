ALTER TABLE "transactions" ADD COLUMN "data" json NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "from_address";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "to_address";--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "amount";