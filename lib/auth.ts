import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/auth/drizzle"; // your drizzle instance
import { user } from "@/db/auth/schema/user";
import { session } from "@/db/auth/schema/session";
import { verification } from "@/db/auth/schema/verification";
import { account } from "@/db/auth/schema/account";
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
