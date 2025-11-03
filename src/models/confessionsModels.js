import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async (id) => {
    return await prisma.confessions.findMany({
        orderBy: { date: "asc" }
    });
}