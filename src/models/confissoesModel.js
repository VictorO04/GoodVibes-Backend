import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export const deleteConfissao = async (id) => {
    return await prisma.confissao.delete({
        where: { id: Number(id) }
    });
}

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