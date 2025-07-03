import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/app/index"; // your drizzle instance
import { usersTable } from "@/app/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, { 
        schema: {
            users: usersTable,
        },
        provider: "pg", // or "mysql", "sqlite"
    })
});