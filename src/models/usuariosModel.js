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