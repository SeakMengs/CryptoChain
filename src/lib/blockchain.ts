import sha256 from "crypto-js/sha256";
import { db } from "../drizzle/db.server";
import { blocks, transactions } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export class Transaction {
    constructor(
        public fromAddress: string,
        public toAddress: string,
        public amount: number
    ) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

type BlockData = {
    transaction: Transaction;
    // used to store the transaction that is verified by the network
    verifiedPendTransaction?: Transaction;
};

export class Block {
    public index: number;
    public timestamp: Date;
    public data: BlockData;
    public previousHash: string;
    public hash: string;
    public nonce: number;

    constructor(
        index: number,
        timestamp: Date,
        data: BlockData,
        previousHash = ""
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    public calculateHash(): string {
        return sha256(
            this.index +
                this.previousHash +
                this.timestamp +
                JSON.stringify(this.data) +
                this.nonce
        ).toString();
    }

    // {
    //     amount: 6,
    //     nounce: 6,
    //     prevHash: 46547
    // }
    
    // {
    //     amount: 4,
    //     nounce: 6,
    //     prevHash: real
    // }

    public mineBlock(difficulty: number): void {
        // This is a simple proof of work algorithm
        // example: difficulty of 5 means the hash must start with 5 zeros
        while (
            this.hash.substring(0, difficulty) !==
            Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
            // console.log("Mining block: ", this.hash);
        }
    }
}

export class Blockchain {
    public chain: Block[];
    public difficulty: number;
    public miningReward: number;

    constructor(difficulty: number) {
        if (difficulty < 1) {
            throw new Error("Difficulty must be at least 1");
        }

        this.chain = [];

        // update this.chain (either from db or create genesis block)
        this.getAllBlocks();

        this.miningReward = 100;
        this.difficulty = difficulty;
    }

    private async createGenesisBlock(): Promise<Block> {
        const newBlock = new Block(0, new Date(), {
            transaction: new Transaction("genesis", "genesis", 0), 
        }, "");

        await this.addBlock(newBlock.data, false);

        return newBlock;
    }

    private getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    private async getAllBlocks() {
        const blocks = await db.query.blocks.findMany();
        if (blocks.length === 0) {
            const genesisBlock = await this.createGenesisBlock();
            this.chain = [genesisBlock];
            return;
        }

        this.chain = blocks.map(
            (block) =>
                new Block(
                    block.index,
                    block.timestamp,
                    block.data as BlockData,
                    block.previousHash
                )
        );
    }

    public async addBlock(
        data: BlockData,
        fetchLatestBlock: boolean = true
    ): Promise<{
        block: Block;
        transactionId: number | null;
    }> {
        // ensure that all blocks are up to date
        if (fetchLatestBlock) {
            await this.getAllBlocks();
        }

        const lastBlock = this.getLatestBlock();

        const newBlock = new Block(
            // in case of no blocks, set index to 0
            lastBlock?.index + 1 || 0,
            new Date(),
            data,
            lastBlock?.hash || ""
        );
        let transactionId = null;

        await db.transaction(async (tx) => {
            await db.insert(blocks).values({
                index: newBlock.index,
                timestamp: newBlock.timestamp,
                data: newBlock.data,
                previousHash: newBlock.previousHash,
                hash: newBlock.hash,
                nonce: newBlock.nonce,
            });

            // if not verifiedPendTransaction, it's a mined block, so we don't need to create a transaction
            if (!data.verifiedPendTransaction) {
                const result = await this.createTransaction(
                    data.transaction,
                    newBlock.index
                );
                transactionId = result[0].insertedId;
            }
        });

        return {
            block: newBlock,
            transactionId: transactionId,
        };
    }

    public async createTransaction(transaction: Transaction, blockId: number) {
        return await db
            .insert(transactions)
            .values({
                blockId: blockId,
                fromAddress: transaction.fromAddress,
                toAddress: transaction.toAddress,
                amount: transaction.amount,
                status: "pending",
                timestamp: new Date(),
            })
            .returning({
                insertedId: transactions.id,
            });
    }

    private async getPendingTransactions() {}

    private async getPendingTransactionById(id: number) {
        return await db.query.transactions.findFirst({
            where: (table, { and, eq }) =>
                and(eq(table.id, id), eq(table.status, "pending")),
        });
    }

    public async minePendingTransactions(
        miningRewardAddress: string,
        pendingTransactionId: number
    ) {
        const pendingTransaction = await this.getPendingTransactionById(
            pendingTransactionId
        );
        if (!pendingTransaction) {
            throw new Error("Transaction not found");
        }

        const rewardTransaction = new Transaction(
            "network",
            miningRewardAddress,
            this.miningReward
        );

        const blockData = {
            transaction: rewardTransaction,
            verifiedPendTransaction: new Transaction(
                pendingTransaction.fromAddress,
                pendingTransaction.toAddress,
                pendingTransaction.amount
            ),
        } satisfies BlockData;

        await db.transaction(async (tx) => {
            const newBlock = await this.addBlock(blockData);
            newBlock.block.mineBlock(this.difficulty);

            await db
                .update(transactions)
                .set({
                    status: "mined",
                })
                .where(eq(transactions.id, pendingTransactionId));
        });
    }

    public getBalanceOfAddress(address: string): number {
        let balance = 0;

        for (const block of this.chain) {
            const transaction = block.data.transaction;

            if (
                !transaction ||
                !transaction.fromAddress ||
                !transaction.toAddress
            ) {
                continue;
            }

            if (transaction.fromAddress === address) {
                balance -= transaction.amount;
            }

            if (transaction.toAddress === address) {
                balance += transaction.amount;
            }
        }

        return balance;
    }

    public isChainValid(): boolean {
        // start from 1 because the first block is the genesis block
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // if (currentBlock.hash !== currentBlock.calculateHash()) {
            //     console.log(`Current hash is invalid ${i}`);
            //     console.log(currentBlock.hash, currentBlock.calculateHash());
            //     return false;
            // }

            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`Previous hash is invalid ${i}`);
                return false;
            }
        }

        return true;
    }
}
