import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema";
import * as dotenv from "dotenv";
dotenv.config();

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
    throw new Error("No url");
}

export const connection =  postgres(DATABASE_URL) 
export const db = drizzle(connection, { schema: schema});