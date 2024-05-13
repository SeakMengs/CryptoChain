import { Blockchain } from "$lib/blockchain";

export async function POST(event) {
    const data = await event.request.json();
    const blockChain = new Blockchain(4);
    await blockChain.syncChains();
    await blockChain.createPendingTransaction(data.signature, data.transaction);
    return new Response(
        JSON.stringify({
            success: true,
        })
    );
}
