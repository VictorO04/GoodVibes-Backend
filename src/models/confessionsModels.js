import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async () => {
    return await prisma.confessions.findMany({
        orderBy: { sender: "asc" }
    });
}

export const findOne = async (id) => {
    return await prisma.confessions.findUnique({
        where: { id: Number(id) }
    });
}