import { Blockchain } from "$lib/blockchain";
import { db } from "../../../../drizzle/db.server";

export async function GET() {
    return new Response(
        JSON.stringify({
            transactions: await db.query.pendingTransactions.findMany(),
        })
    );
}
