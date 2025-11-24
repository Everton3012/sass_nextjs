"use server";

import prisma from "@/lib/prisma";

export const getUserData = async ({ userId }: GetUserDataProps) => {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        const user = await prisma.user.findFirst({ where: { id: userId } , include: { subscription: true }});

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.log("Error fetching user data:", error);
        return null;
    }
}
