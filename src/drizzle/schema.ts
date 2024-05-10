import { boolean, integer, json, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const blocks = pgTable("blocks", {
    index: serial("index").primaryKey(),
    timestamp: timestamp("timestamp").notNull(),
    transactions: text("transactions").notNull(),
    previousHash: text("previous_hash").notNull(),
    hash: text("hash").notNull(),
    nonce: integer("nonce").notNull(),
});

export const wallets = pgTable("wallets", {
    id: text("id").primaryKey(),
    signature: text("signature").notNull(),
});

export const pendingTransactions = pgTable("pending_transactions", {
    id: serial("id").primaryKey(),
    sender: text("sender").notNull(),
    receiver: text("receiver").notNull(),
    amount: integer("amount").notNull(),
    asset: text("asset").notNull(),
    timestamp: timestamp("timestamp").notNull(),
    isBeingMined: boolean("is_being_mined").default(false),
});