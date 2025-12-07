//importação do prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Procura todas as confissões do banco
export const findAllConfissoes = async () => {
    return await prisma.confissao.findMany({
        include: {
            remetente: {
                select: {
                    id: true,
                    nomeUsuario: true,
                    anonimo: true
                }
            },
                destinatario: {
                select: {
                    id: true,
                    nomeUsuario: true,
                    anonimo: true
                }
            }
        },
        orderBy: { data: "desc" }
    });
}

//procura a confissão pelo id
export const findConfissaoById = async (id) => {
    return await prisma.confissao.findUnique({
        where: { id: Number(id) },
        include: {
            remetente: {
                select: {
                    id: true,
                    nomeUsuario: true,
                    anonimo: true
                }
            },
                destinatario: {
                select: {
                    id: true,
                    nomeUsuario: true,
                    anonimo: true
                }
            }
        }
    });
}

//cria a confissão
export const createConfissao = async (data) => {
    return await prisma.confissao.create({
        data: {
            mensagem: data.mensagem,
            tipoMensagem: data.tipoMensagem,
            remetenteId: Number(data.remetenteId),
            destinatarioId: Number(data.destinatarioId)
        }
    });
}

//deleta a confissão
export const deleteConfissao = async (id) => {
    return await prisma.confissao.delete({
        where: { id: Number(id) }
    });
}

//atualiza a confissão
export const updateConfissao = async (id, data) => {
    return await prisma.confissao.update({
        where: { id: Number(id) },
        data: {
            ...(data.mensagem !== undefined && {mensagem: data.mensagem}),
            ...(data.tipoMensagem !== undefined && {tipoMensagem: data.tipoMensagem}),
            ...(data.remetenteId !== undefined && { remetenteId: Number(data.remetenteId) }),
            ...(data.destinatarioId !== undefined && { destinatarioId: Number(data.destinatarioId) }),
        }
    });
}

//procura as confissões a partir do tipo delas
export const findConfissoesByTipo = async (tipo) => {
    return await prisma.confissao.findMany({
        where: {
            tipoMensagem: tipo
        },
        include: {
            remetente: {
                select: {
                    id: true,
                    nomeUsuario: true,
                    anonimo: true
                }
            },
                destinatario: {
                select: {
                    id: true,
                    nomeUsuario: true,
                    anonimo: true
                }
            }
        }
    });
}

//procura as confissões anônimas
export const findConfissoesAnonimas = async () => {
    return await prisma.confissao.findMany({
        where: {
            remetente: {
                anonimo: true
            }
        },
        include: {
            remetente: {
                select: {
                    id: true,
                    nomeUsuario: true,
                    anonimo: true
                }
            },
                destinatario: {
                select: {
                    id: true,
                    nomeUsuario: true,
                    anonimo: true
                }
            }
        },
        orderBy: { data: "desc" }
    });
}