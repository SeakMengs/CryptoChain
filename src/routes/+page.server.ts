import { Blockchain, Transaction } from "$lib/blockchain";
export async function load() {
    const testBlockChain = async () => {
        // Create a new instance of Blockchain with difficulty 2 (higher difficulty means more time to mine a block)
        const blockchain = new Blockchain(2);
        
        // Create a pending transaction
        const pendingTransaction = new Transaction("address1", "address2", 100);

        // Add the pending transaction to the blockchain
        const pendingBlock = await blockchain.addBlock({
            transaction: pendingTransaction,
        });

        // Mine the pending transaction
        await blockchain.minePendingTransactions("minerAddress", pendingBlock.transactionId || 0);

        // Get the balance of "address1" after the transaction is mined
        const balanceOfAddress1 = blockchain.getBalanceOfAddress("address1");
        console.log("Balance of address1:", balanceOfAddress1);

        // Get the balance of "address2" after the transaction is mined
        const balanceOfAddress2 = blockchain.getBalanceOfAddress("address2");
        console.log("Balance of address2:", balanceOfAddress2);

        // Check if the blockchain is valid
        const isChainValid = blockchain.isChainValid();
        console.log("Is blockchain valid?", isChainValid);
    };

    await testBlockChain();
    return {};
}