import * as confissoesModel from "../models/confissoesModel.js";

//get all confissões
export const getAllConfissoes = async (req, res) => {
    try {
        const confissoes = await confissoesModel.findAllConfissoes();

        //mensagem de status 200 com operador ternário para verificar se há dados no banco
        res.status(200).json({
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

//get confissão by id
export const getConfissaoByID = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        //verica se é um número, se não for, erro 400
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const confissao = await confissoesModel.findConfissaoById(id);

        //verica existe com o id digitado, se não, erro 404
        if (!confissao) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhuma confissão com o id ${id} encontrada`
            });
        }

        //mensagem de sucesso
        res.status(200).json({
            total: 1,
            mensagem: `Confissão com o id ${id} encontrada`,
            confissao: confissao
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

//create confissão
export const createConfissao = async (req, res) => {
    try {
        //constantes para puxar body
        const data = req.body;
        const { mensagem, tipoMensagem, remetenteId, destinatarioId } = data;

        //verificação de campos obrigatórios, se faltar campos, erro 400
        const camposObrigatorios = ["mensagem", "tipoMensagem", "remetenteId", "destinatarioId"];

        const faltando = camposObrigatorios.filter((campo) => !data[campo] && data[campo] !== 0);

        if (faltando.length > 0) {
            return res.status(400).json({
                total: 0,
                mensagem: `Os seguintes campos são obrigatórios:  ${faltando.join(", ")}`
            });
        }

        /*se a mensagem é diferente de undefined, irá pegar todas as palavras proibidas que estão no .env para analisar.
        Caso haja algo proibido na mensagem, erro 400
        */
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
        
        //se o tipo da mensagem é diferente de undefined, irá definir os tipos válidos, se digitar algum tipo inválido, erro 400
        if (tipoMensagem !== undefined) {
            const tiposValidos = ["romantica", "amizade", "motivacional", "comedia", "reflexiva"];
        
            if (!tiposValidos.includes(tipoMensagem.toLowerCase())) {
                return res.status(400).json({
                    total: 0,
                    mensagem: `Tipo inválido. Tipos aceitos: ${tiposValidos.join(", ")}`
                });
            }
        }

        const novaConfissao = await confissoesModel.createConfissao({
            mensagem,
            tipoMensagem,
            remetenteId: Number(remetenteId),
            destinatarioId: Number(destinatarioId)
        });

        //mensagem de sucesso
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

//delete confissão
export const deleteConfissao = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        //verica se é um número, se não for, erro 400
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const confissaoExiste = await confissoesModel.findConfissaoById(id);

        //verica existe com o id digitado, se não, erro 404
        if (!confissaoExiste) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhuma confissão com o id ${id} encontrada`
            });
        }

        await confissoesModel.deleteConfissao(id);

        //mensagem de sucesso
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

//update confissão
export const updateConfissao = async (req, res) => {
    try {
        //constantes para puxar body e id
        const data = req.body;
        const { mensagem, tipoMensagem } = data;
        const id = parseInt(req.params.id);

        //verica se é um número, se não for, erro 400
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const confissaoExiste = await confissoesModel.findConfissaoById(id);

        //verica existe com o id digitado, se não, erro 404
        if (!confissaoExiste) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhuma confissão com o id ${id} encontrada`
            });
        }

        /*se a mensagem é diferente de undefined, irá pegar todas as palavras proibidas que estão no .env para analisar.
        Caso haja algo proibido na mensagem, erro 400
        */
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

        //se o tipo da mensagem é diferente de undefined, irá definir os tipos válidos, se digitar algum tipo inválido, erro 400
        if (tipoMensagem !== undefined) {
            const tiposValidos = ["romantica", "amizade", "motivacional", "comedia", "reflexiva"];
        
            if (!tiposValidos.includes(tipoMensagem.toLowerCase())) {
                return res.status(400).json({
                    total: 0,
                    mensagem: `Tipo inválido. Tipos aceitos: ${tiposValidos.join(", ")}`
                });
            }
        }

        const confissaoAtualizada = await confissoesModel.updateConfissao(id, data);

        //mensagem de sucesso
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

//get confissões by tipo
export const getConfissaoByTipo = async (req, res) => {
    try {
        const tipo = req.params.tipo.toLowerCase();

        //define tipos válidos, se não, erro 400
        const tiposValidos = ["romantica", "amizade", "motivacional", "comedia", "reflexiva"];

        if (!tiposValidos.includes(tipo)){
            return res.status(400).json({
                total: 0,
                mensagem: `Tipo inválido. Tipos aceitos: ${tiposValidos.join(", ")}`
            });
        }

        const confissoes = await confissoesModel.findConfissoesByTipo(tipo);

        //mensagem de sucesso
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

//get confissões anônimas
export const getConfissoesAnonimas = async (req, res) => {
    try {
        const confissoes = await confissoesModel.findConfissoesAnonimas();

        //mensagem de sucesso
        res.status(200).json({
            total: confissoes.length,
            mensagem: confissoes.length === 0
                ? "Não há confissões anônimas na lista"
                : "Lista de confissões anônimas encontrada",
            confissoes: confissoes
        });
        
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}