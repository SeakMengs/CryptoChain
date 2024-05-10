export interface Block {
    id: number;
    transactions: Transaction[];
    prevBlock: number;
    hash: string;
    timestamp: Date;
}
// 1 Block can store 10 transaction
export interface PendingTransaction {
    id: number;
    transaction: Transaction;
    timestamp: Date;
}

export interface Transaction {
    id: number;
    sender: string;
    receiver: string;
    amount: number;
    asset: string;
    timestamp: Date;
}