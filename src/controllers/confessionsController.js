import * as confessionsModel from "./../models/confessionsModels.js";

export const listAllConfessions = async (req, res) => {
    try {
        const confessions = await confessionsModel.findAllConfessions();

        return res.status(200).json({
            total: confessions.length,
            mensagem: confessions.length === 0
                ? "Não há confissões na lista"
                : "Lista de confissões encontrada",
                confessions
        });
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });
    }
}

export const listOneConfession = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const confession = await confessionsModel.findOneConfession(id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        if (!confession) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhuma confissão com o id ${id} encontrada`,
            });
        }

        res.status(200).json({
            total: 1,
            mensagem: `confissão com o id ${id} encontrada`,
            confession
        });
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });
    }
}

export const createConfession = async (req, res) => {
    try {
        const { message, message_type, recipient, sender } = req.body;

        const data = req.body;
        const requiredfields = ["message", "message_type", "recipient", "sender"];

        const missing = requiredfields.filter((field) => !data[field]);

        if (missing.length > 0) {
            return res.status(400).json({
                error: `the following fields are required: ${missing.join(", ")}.`
            });
        }

        const badWords = [
            "nigga", "monkey", "fdp", "pau", "cu", "arrombado", "baleia", "maldito", "escravo","corno", "viado", "baitola", "viadinho", "macaco", "preto"
        ];
        
        const containsBadWords = badWords.some((word) => message.toLowerCase().includes(word));
        
        if (containsBadWords) {
            return res.status(400).json({
                error: "The message includes bad words"
            });
        }
        
        const messageTypes = ["romântica", "amizade", "motivacional", "comédia", "reflexiva"];
        
        const okMessageType = messageTypes.some((word) => message_type.toLowerCase().includes(word));

        if (!okMessageType) {
            return res.status(400).json({
                error: `tipos de mensagem: ${messageTypes.join(", ")}`
            });
        }

        const newConfession = await confessionsModel.createConfession(req.body);

        res.status(201).json({
            message: "new confession created",
            confession: newConfession
        });
    } catch (error) {
        res.status(500).json({
            error: "internal server error",
            details: error.message,
            status: 500
        });
    }
}

export const deleteConfession = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const confessionExists = await confessionsModel.findOneConfession(id);

        if (!confessionExists) {
            return res.status(404).json({
                error: "confession not founded",
                id: id
            });
        }

        await confessionsModel.deleteConfession(id);

        res.status(200).json({
            message: "confession successfully deleted",
            confessionRemoved: confessionExists
        });
    } catch (error) {
        res.status(500).json({
            error: "internal server error",
            details: error.message,
            status: 500
        });
    }
}

export const updateConfession = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;

        const confessionExists = await confessionsModel.findOneConfession(id);

        if (!confessionExists) {
            return res.status(404).json({
                error: "confession not founded",
                id: id
            });
        }

        const confessionUpdated = await confessionsModel.updateConfession(id, data);

        res.status(200).json({
            message: "confession succesfully updated",
            confession: confessionUpdated
        });
    } catch (error) {
        res.status(500).json({
            error: "internal server error",
            details: error.message,
            status: 500
        });
    }
}