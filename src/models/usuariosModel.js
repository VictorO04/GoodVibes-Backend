import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllUsuarios = async () => {
    return await prisma.usuario.findMany({
        orderBy: { nomeUsuario: "asc" }
    });
}

export const findUsuarioById = async (id) => {
    return await prisma.usuario.findUnique({
      where: { id: Number(id) }
    });
}

export const createUsuario = async (data) => {
    return await prisma.usuario.create({
        data: {
            nomeUsuario: data.nomeUsuario,
            email: data.email,
            senha: data.senha,
            anonimo: data.anonimo
        }
    });
}

export const deleteUsuario = async (id) => {
    return await prisma.usuario.delete({
        where: { id: Number(id) }
    });
}

export const updateUsuario = async (id, data) => {
    return await prisma.usuario.update({
        where: { id: Number(id) },
        data: {
            ...(data.nomeUsuario !== undefined && {nomeUsuario: data.nomeUsuario}),
            ...(data.email !== undefined && {email: data.email}),
            ...(data.senha !== undefined && { senha: data.senha }),
            ...(data.anonimo !== undefined && { anonimo: data.anonimo }),
        }
    });
}