import { Blockchain } from "$lib/blockchain";
import { getTableColumns } from "drizzle-orm";
import { db } from "../../../../drizzle/db.server";
import { wallets } from "../../../../drizzle/schema";
const { privateKey, ...rest } = getTableColumns(wallets);

export async function GET() {
    return new Response(
        JSON.stringify({ wallets: await db.select({ ...rest }).from(wallets) })
    );
}
