import sha256 from "crypto-js/sha256";
import { db } from "../drizzle/db.server";
import { blocks, pendingTransactions } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export interface Transaction {
    id: number;
    sender: string;
    receiver: string;
    amount: number;
    asset: string;
    timestamp: Date;
}

export class Block {
    public index: number;
    public timestamp: Date;
    public transactions: Transaction[];
    public previousHash: string;
    public hash: string;
    public nonce: number;

    constructor(
        index: number,
        timestamp: Date,
        transactions: Transaction[],
        previousHash: string,
        nonce: number,
        hash?: string
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = nonce;

        if (hash) {
            this.hash = hash;
            return;
        }

        this.hash = this.calculateHash();
    }

    public calculateHash(): string {
        return sha256(
            this.index +
                this.previousHash +
                this.timestamp +
                JSON.stringify(this.transactions) +
                this.nonce
        ).toString();
    }

    public mineBlock(difficulty: number) {
        const target = Array(difficulty + 1).join("0");
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

export class Blockchain {
    public chain: Block[];
    private readonly difficulty: number;
    private readonly miningReward: number;
    private readonly systemWallet: string = "network";
    private readonly systemSignature: string = "1234567890";
    private readonly genesisHash: string = "genesisHash";
    private readonly genesisIndex: number = 0;

    constructor(difficulty: number, miningReward: number = 1) {
        if (difficulty < 1) {
            throw new Error("Difficulty must be at least 1");
        }

        this.chain = [];

        this.miningReward = miningReward;
        this.difficulty = difficulty;
    }

    private async getLatestBlock(
        syncChains: boolean = true
    ): Promise<Block | undefined> {
        if (syncChains) {
            await this.syncChains();
        }

        return this.chain[this.chain.length - 1];
    }

    private async createGenesisBlock(): Promise<Block> {
        // create system balance
        const transaction: Transaction = {
            id: 0,
            sender: this.systemWallet,
            receiver: this.systemWallet,
            amount: 1000000,
            asset: "YatoCoin",
            timestamp: new Date(),
        };

        const newBlock = await this.addBlock({
            transactions: [transaction],
            receiverAddress: this.systemWallet,
            signature: this.systemSignature,
            syncChains: false,
        });

        return newBlock;
    }

    public async syncChains() {
        const blocks = await db.query.blocks.findMany({
            orderBy: (table, { asc }) => [asc(table.index)],
        });

        if (blocks.length === 0) {
            const genesisBlock = await this.createGenesisBlock();
            this.chain = [genesisBlock];
            await this.syncChains();
            return;
        }

        this.chain = blocks.map((block) => {
            return new Block(
                block.index,
                block.timestamp,
                JSON.parse(block.transactions),
                block.previousHash,
                block.nonce,
                block.hash
            );
        });
    }

    // If block is provided, save db with the block provided.
    // arg receive as object to avoid confusion with multiple arguments
    public async addBlock({
        transactions,
        receiverAddress,
        signature,
        block = undefined,
        syncChains = true,
    }: {
        transactions: Transaction[];
        receiverAddress: string;
        signature: string;
        block?: Block;
        syncChains?: boolean;
    }): Promise<Block> {
        const walletIsValid = await this.isWalletValid(
            this.systemWallet,
            this.systemSignature
        );
        if (!walletIsValid) {
            throw new Error("Invalid wallet");
        }

        let newBlock: Block;

        // when mining, we pass block and store block instead of creating a new one
        if (block) {
            newBlock = block;
        } else {
            // this one mostly for creating genesis block
            const lastBlock = await this.getLatestBlock(syncChains);
            newBlock = new Block(
                lastBlock ? lastBlock.index + 1 : this.genesisIndex,
                new Date(),
                transactions,
                lastBlock?.hash || this.genesisHash,
                0
            );
        }

        await db.transaction(async (tx) => {
            // save block to db
            await db.insert(blocks).values({
                index: newBlock.index,
                timestamp: newBlock.timestamp,
                transactions: JSON.stringify(newBlock.transactions),
                previousHash: newBlock.previousHash,
                hash: newBlock.hash,
                nonce: newBlock.nonce,
            });

            // remove mined transactions from pending transactions
            await this.removeMinedPendingTransactions(transactions);

            // create mining reward transaction
            await this.createPendingTransaction(signature, {
                amount: this.miningReward,
                asset: "YatoCoin",
                receiver: receiverAddress,
                sender: "network",
                timestamp: new Date(),
            });
        });

        if (syncChains) {
            await this.syncChains();
        }

        return newBlock;
    }

    public async createPendingTransaction(
        signature: string,
        transaction: typeof pendingTransactions.$inferInsert
    ) {
        const walletIsValid = await this.isWalletValid(
            transaction.sender,
            signature
        );
        if (!walletIsValid) {
            throw new Error("Invalid wallet");
        }

        // check if sender has enough balance, except for system transactions on first block transaction
        if (transaction.id != 0) {
            const balance = await this.getBalance(transaction.sender);
            if (balance < transaction.amount) {
                throw new Error("Insufficient balance");
            }
        }

        // remove id from transaction, since it is auto-incremented
        delete transaction.id;

        await db.insert(pendingTransactions).values(transaction);
    }

    private async getPendingTransactions() {
        return await db.query.pendingTransactions.findMany({
            limit: 10,
        });
    }

    private async removeMinedPendingTransactions(transactions: Transaction[]) {
        await db.transaction(async (tx) => {
            for (const transaction of transactions) {
                await db
                    .delete(pendingTransactions)
                    .where(eq(pendingTransactions.id, transaction.id));
            }
        });
    }

    private async isWalletValid(walletId: string, signature: string) {
        const wallet = await db.query.wallets.findFirst({
            where: (table, { eq, and }) =>
                and(eq(table.id, walletId), eq(table.signature, signature)),
        });

        return !!wallet;
    }

    public async minePendingTransactions(minerAddress: string) {
        const pendingTransactions = await this.getPendingTransactions();
        try {
            if (pendingTransactions.length === 0) {
                throw new Error("No pending transactions to mine");
            }

            // lock pending transactions
            await this.lockPendingTransactions(true, pendingTransactions);
            const latestBlock = await this.getLatestBlock();
            if (!latestBlock) {
                throw new Error("No blocks found");
            }

            const newBlock = new Block(
                latestBlock.index + 1,
                new Date(),
                pendingTransactions,
                latestBlock.hash,
                0
            );

            newBlock.mineBlock(this.difficulty);

            await this.addBlock({
                transactions: pendingTransactions,
                receiverAddress: minerAddress,
                signature: this.systemSignature,
                block: newBlock,
            });
        } finally {
            // unlock pending transactions, even though if mined the transactions will be removed
            await this.lockPendingTransactions(false, pendingTransactions);
        }
    }

    private async lockPendingTransactions(
        lock: boolean,
        transactions: Transaction[]
    ) {
        await db.transaction(async (tx) => {
            for (const transaction of transactions) {
                await db
                    .update(pendingTransactions)
                    .set({
                        isBeingMined: lock,
                    })
                    .where(eq(pendingTransactions.id, transaction.id));
            }
        });
    }

    public async getBalance(walletId: string): Promise<number> {
        await this.syncChains();
        let balance = 0;

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.receiver === walletId) {
                    balance += transaction.amount;

                    // skip first block transaction, since it is system transaction
                    if (transaction.id === 0) {
                        continue;
                    }
                }

                if (transaction.sender === walletId) {
                    balance -= transaction.amount;
                }
            }
        }

        return balance;
    }

    public async isChainValid(): Promise<boolean> {
        await this.syncChains();

        for (let i = this.genesisIndex + 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log(
                    `Block hash mismatch: ${
                        currentBlock.hash
                    } !== ${currentBlock.calculateHash()} at block index ${
                        currentBlock.index
                    }`
                );
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(
                    `Previous hash mismatch: ${currentBlock.previousHash} !== ${previousBlock.hash} at block index ${currentBlock.index}`
                );
                return false;
            }
        }

        return true;
    }
}
