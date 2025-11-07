import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllConfessions = async () => {
    return await prisma.confessions.findMany({
        orderBy: { sender: "asc" }
    });
}

export const findOneConfession = async (id) => {
    return await prisma.confessions.findUnique({
        where: { id: Number(id) }
    });
}

export const createConfession = async (data) => {
    return await prisma.confessions.create({
        data: {
            message: data.message,
            message_type: data.message_type,
            recipient: data.recipient,
            sender: data.sender
        }
    });
}