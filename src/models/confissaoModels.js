import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllConfissoes = async () => {
    return await prisma.confissao.findMany({
        orderBy: { remetenteId: "asc" }
    });
}

export const findConfissaoById = async (id) => {
    return await prisma.confissao.findUnique({
        where: { id: Number(id) }
    });
}

export const createConfession = async (data) => {
    return await prisma.confessions.create({
        data: {
            message: data.message,
            message_type: data.message_type,
            recipient: Number(data.recipient),
            sender: Number(data.sender)
        }
    });
}

export const deleteConfession = async (id) => {
    return await prisma.confessions.delete({
        where: { id: Number(id) }
    });
}

export const updateConfession = async (id, data) => {
    return await prisma.confessions.update({
        where: { id: Number(id) },
        data: {
            ...(data.message && {message: data.message}),
            ...(data.message_type && {message_type: data.message_type}),
            ...(data.recipient && {recipient: data.recipient}),
            ...(data.sender && {sender: data.sender})
        }
    });
}