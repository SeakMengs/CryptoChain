import { Blockchain } from "$lib/blockchain";

export async function POST(event) {
    const blockChain = new Blockchain(4);
    return new Response(
        JSON.stringify({ wallet: await blockChain.createWallet() })
    );
}
