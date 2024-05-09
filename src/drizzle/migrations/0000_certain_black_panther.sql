CREATE TABLE IF NOT EXISTS "blocks" (
	"index" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp NOT NULL,
	"data" json NOT NULL,
	"previous_hash" text NOT NULL,
	"hash" text NOT NULL,
	"nonce" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"block_id" integer NOT NULL,
	"from_address" text NOT NULL,
	"to_address" text NOT NULL,
	"amount" integer NOT NULL,
	"status" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wallets" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"balance" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_block_id_blocks_index_fk" FOREIGN KEY ("block_id") REFERENCES "public"."blocks"("index") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
