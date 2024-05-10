CREATE TABLE IF NOT EXISTS "blocks" (
	"index" serial PRIMARY KEY NOT NULL,
	"timestamp" timestamp NOT NULL,
	"transactions" text NOT NULL,
	"previous_hash" text NOT NULL,
	"hash" text NOT NULL,
	"nonce" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pending_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender" text NOT NULL,
	"receiver" text NOT NULL,
	"amount" integer NOT NULL,
	"asset" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"is_being_mined" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wallets" (
	"id" text PRIMARY KEY NOT NULL,
	"signature" text NOT NULL
);
