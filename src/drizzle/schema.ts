import { integer, json, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const blocks = pgTable("blocks", {
    index: serial("index").primaryKey(),
    timestamp: timestamp("timestamp").notNull(),
    data: json("data").notNull(),
    previousHash: text("previous_hash").notNull(),
    hash: text("hash").notNull(),
    nonce: integer("nonce").notNull(),
});

export const wallets = pgTable("wallets", {
    id: serial("id").primaryKey(),
    address: text("address").notNull(),
    balance: integer("balance").notNull(),
});

export const transactions = pgTable("transactions", {
    id: serial("id").primaryKey(),
    blockId: integer("block_id").notNull().references(() => blocks.index),
    // fromAddress: text("from_address").notNull(),
    // toAddress: text("to_address").notNull(),
    // amount: integer("amount").notNull(),
    data: json("data").notNull(),
    status: text("status").notNull(),
    timestamp: timestamp("timestamp").notNull(),
});

// export const blockchains = pgTable("blockchains", {
//     id: serial("id").primaryKey(),
//     genesisBlockId: integer("genesis_block_id").notNull().references(() => blocks.index),
//     miningReward: text("mining_reward").notNull(),
//     difficulty: integer("difficulty").notNull(),
//     timestamp: timestamp("timestamp").notNull(),
// });
