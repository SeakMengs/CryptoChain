import { Blockchain } from "$lib/blockchain";

export async function GET() {
    const blockChain = new Blockchain(4);
    await blockChain.syncChains();
    return new Response(
        JSON.stringify({ success: await blockChain.isChainValid() })
    );
}
