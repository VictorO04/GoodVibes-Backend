//importação do prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Procura todos os usuários do banco
export const findAllUsuarios = async () => {
    return await prisma.usuario.findMany({
        orderBy: { nomeUsuario: "asc" }
    });
}

//procura o usuário pelo id
export const findUsuarioById = async (id) => {
    return await prisma.usuario.findUnique({
      where: { id: Number(id) }
    });
}

//cria o usuário
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

//deleta o usuário
export const deleteUsuario = async (id) => {
    return await prisma.usuario.delete({
        where: { id: Number(id) }
    });
}

//atualiza o usuário
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
