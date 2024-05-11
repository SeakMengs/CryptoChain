import { Blockchain, type Transaction } from "$lib/blockchain";

// Before test populate sql first
// INSERT INTO wallets (id, signature) VALUES ('network', '1234567890');
// INSERT INTO wallets (id, signature) VALUES ('1234', '1234');
// INSERT INTO wallets (id, signature) VALUES ('miner', 'miner');

export async function load() {
    const systemWallet = "network";
    const systemSignature = "1234567890";
    const receiverWallet = "1234";
    const minerWallet = "miner";

    const testBlockChain = async () => {
        try {
            // Create a new instance of Blockchain with difficulty 2 and mining reward 1
            const blockchain = new Blockchain(2, 1);

            // Create a transaction
            const transaction: Transaction = {
                id: 1,
                sender: systemWallet,
                receiver: receiverWallet,
                amount: 100,
                asset: "YatoCoin",
                timestamp: new Date(),
            };

            // Add the transaction to the pending transactions
            await blockchain.createPendingTransaction(
                systemSignature,
                transaction
            );

            // Mine pending transactions
            await blockchain.minePendingTransactions(minerWallet);

            // show system, receiver and miner balances
            console.log(
                "System balance: ",
                await blockchain.getBalance(systemWallet)
            );
            console.log(
                "Receiver balance: ",
                await blockchain.getBalance(receiverWallet)
            );
            console.log(
                "Miner balance: ",
                await blockchain.getBalance(minerWallet)
            );

            // verify the chain
            console.log("Is chain valid: ", await blockchain.isChainValid());
            console.log("Chain: ", blockchain.chain);
        } catch (error) {
            console.error(error);
        }
    };

    await testBlockChain();

    return {};
}
