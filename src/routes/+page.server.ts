import { Blockchain, type Transaction } from "$lib/blockchain";

// Before test populate sql first
// INSERT INTO "public"."wallets" ("id", "public_key", "private_key") VALUES ('network', '04706fbbad79690f8adbfdffac9cf721e1a1bca1c3cb12aeb006acd15007a6954266799a1540dd5c45bfce44dd3065694b0280cf33a7bece7377a9483f9fbad39e', '2bc6e112c479cad3e83aefa0e140f314a1f13cbb3774248bd9e7dc31f74595ea');
// INSERT INTO "public"."wallets" ("id", "public_key", "private_key") VALUES ('11f93d97-b893-4f2e-801c-71da467ff1d8', '04db473413b44f481505c21ecc39673f55fbc73d4c3409963c2276e9eb630efd5dfcb39c44533b218e807283cda1b78b734f7cc02f956b4b3f48aea55e5c1ecaf2', 'f7ca06821e4db6f69c888056a389e0166f1daa0940820a65cd7fcad73d3af668');
// INSERT INTO "public"."wallets" ("id", "public_key", "private_key") VALUES ('7ee79bc9-6ad5-4931-8378-007556052eb2', '04c126c453cd82b84652cd05036d186176c9288dec5ace54a6ccba67aa5e93c98aa0fbb7c983657f71519551664c9a3fedaf3d5b64004412b6d10425dbbbaeb495', '8356359e8e621ed0b64965e44a813c28ff51e59fd961a446fbc7e7a4cd9aefd7');


export async function load() {
    const systemWallet = "network";
    const systemPrivateKey = "2bc6e112c479cad3e83aefa0e140f314a1f13cbb3774248bd9e7dc31f74595ea";
    const receiverWallet = "11f93d97-b893-4f2e-801c-71da467ff1d8";
    const minerWallet = "7ee79bc9-6ad5-4931-8378-007556052eb2";

    const testBlockChain = async () => {
        try {
            // Create a new instance of Blockchain with difficulty 2 and mining reward 1
            const blockchain = new Blockchain(2, 1);
            // console.log(await blockchain.createWallet());

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
                systemPrivateKey,
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
