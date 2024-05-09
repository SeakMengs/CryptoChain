import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
    throw new Error("No url");
}

export default {
    introspect: {
        casing: 'camel',
      },
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: DATABASE_URL,
    },
} satisfies Config;
