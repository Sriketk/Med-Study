import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "https://v0-usmle-step-1-design.vercel.app/"
    baseURL: "http://localhost:3000"
})