import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "@/db/auth/schema/user";

const DATABASE_URL = process.env.DATABASE_URL || "";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(DATABASE_URL, { prepare: false });
export const db = drizzle({ client });
