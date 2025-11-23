import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession["user"]
    }
}

interface User {
    id : string;
    name: string;
    email: string;
    emailVerified?: string | null | boolean;
    image?: string | null;
    stripeCustomerId?: string;
    times: string[];
    address?: string;
    phone?: string;
    status?: boolean;
    timeZone?: string;
    createdAt: string;
    updateAt: string;
}