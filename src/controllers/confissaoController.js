import * as confissaoModel from "./../models/confissaoModels.js";

export const getAllConfissoes = async (req, res) => {
    try {
        const confissoes = await confissaoModel.findAllConfissoes();

        return res.status(200).json({
            total: confissoes.length,
            mensagem: confissoes.length === 0
                ? "Não há confissões na lista"
                : "Lista de confissões encontrada",
            confissoes: confissoes
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

export const getConfissaoByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const confissao = await confissaoModel.findConfissaoById(id);


        if (!confissao) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhuma confissão com o id ${id} encontrada`
            });
        }

        res.status(200).json({
            total: 1,
            mensagem: `confissão com o id ${id} encontrada`,
            confissao: confissao
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

export const createConfissao = async (req, res) => {
    try {
        const data = req.body;
        const { mensagem, tipoMensagem, remetenteId, destinatarioId } = data;

        const camposObrigatorios = ["mensagem", "tipoMensagem", "remetenteId", "destinatarioId"];

        const faltando = camposObrigatorios.filter((campo) => !data[campo] && data[campo] !== 0);

        if (faltando.length > 0) {
            return res.status(400).json({
                total: 0,
                mensagem: `Os seguintes campos são obrigatórios:  ${faltando.join(", ")}`
            });
        }

        if (mensagem !== undefined) {
            const decodificado = Buffer.from(process.env.PALAVRAS_PROIBIDAS_BASE64, "base64").toString("utf-8");
            const palavrasProibidas = decodificado.split(",").map(p => p.trim().toLowerCase());

            const msgLowerCase = mensagem.toLowerCase();
            const temPalavrasProibidas = palavrasProibidas.some(palavra => msgLowerCase.includes(palavra));

            if (temPalavrasProibidas) {
                return res.status(400).json({
                    total: 0,
                    mensagem: "Mensagem contém palavras proibidas"
                });
            }
        }

        if (tipoMensagem !== undefined) {
            const tiposValidos = ["romantica", "amizade", "motivacional", "comedia", "reflexiva"];
        
            if (!tiposValidos.includes(tipoMensagem.toLowerCase())) {
                return res.status(400).json({
                    total: 0,
                    mensagem: `Tipo inválido. Tipos aceitos: ${tiposValidos.join(", ")}`
                });
            }
        }

        const novaConfissao = await confissaoModel.createConfissao({
            mensagem,
            tipoMensagem,
            remetenteId: Number(remetenteId),
            destinatarioId: Number(destinatarioId)
        });

        res.status(201).json({
            total: 1,
            mensagem: "Confissão criada com sucesso",
            confissao: novaConfissao
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

export const deleteConfissao = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const confissaoExiste = await confissaoModel.findConfissaoById(id);

        if (!confissaoExiste) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhuma confissão com o id ${id} encontrada`
            });
        }

        await confissaoModel.deleteConfissao(id);

        res.status(200).json({
            mensagem: "Confissão deletada com sucesso",
            confissao: confissaoExiste
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

export const updateConfissao = async (req, res) => {
    try {
        const data = req.body;
        const { mensagem, tipoMensagem } = data;
        const id = parseInt(req.params.id);

        const confissaoExiste = await confissaoModel.findConfissaoById(id);

        if (!confissaoExiste) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhuma confissão com o id ${id} encontrada`
            });
        }

        if (mensagem !== undefined) {
            const decodificado = Buffer.from(process.env.PALAVRAS_PROIBIDAS_BASE64, "base64").toString("utf-8");
            const palavrasProibidas = decodificado.split(",").map(p => p.trim().toLowerCase());

            const msgLowerCase = mensagem.toLowerCase();
            const temPalavrasProibidas = palavrasProibidas.some(palavra => msgLowerCase.includes(palavra));

            if (temPalavrasProibidas) {
                return res.status(400).json({
                    total: 0,
                    mensagem: "Mensagem contém palavras proibidas"
                });
            }
        }

        if (tipoMensagem !== undefined) {
            const tiposValidos = ["romantica", "amizade", "motivacional", "comedia", "reflexiva"];
        
            if (!tiposValidos.includes(tipoMensagem.toLowerCase())) {
                return res.status(400).json({
                    total: 0,
                    mensagem: `Tipo inválido. Tipos aceitos: ${tiposValidos.join(", ")}`
                });
            }
        }

        const confissaoAtualizada = await confissaoModel.updateConfissao(id, data);

        res.status(200).json({
            total: 1,
            mensagem: "Confissão atualizada com sucesso",
            confissao: confissaoAtualizada
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

export const getConfissaoByTipo = async (req, res) => {
    try {
        const tipo = req.params.tipo.toLowerCase();

        const tiposValidos = ["romantica", "amizade", "motivacional", "comedia", "reflexiva"];

        if (!tiposValidos.includes(tipo)){
            return res.status(400).json({
                total: 0,
                mensagem: `Tipo inválido. Tipos aceitos: ${tiposValidos.join(", ")}`
            });
        }

        const confissoes = await confissaoModel.findConfissoesByTipo(tipo);

        res.status(200).json({
            total: confissoes.length,
            mensagem: confissoes.length === 0
                ? `Não há confissões do tipo ${tipo} na lista`
                : `Lista de confissões do tipo ${tipo} encontrada`,
            confissoes: confissoes
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });
    }
}