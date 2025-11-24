import * as confessionsModel from "./../models/confessionsModels.js";
import dotenv from  "dotenv";

dotenv.config();

export const getAllConfessions = async (req, res) => {
  try {
    const data = await confessionsModel.findAllConfessions();

    if (!data || data.length === 0) {
      return res.status(404).json({
        total: 0,
        mensagem: "Não encontrado",
        detalhes: "Nenhuma confissão foi encontrada",
        dados: null,
      });
    }
    return res.status(200).json({
      total: data.length,
      mensagem: "Confissões encontradas com sucesso",
      dados: data,
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno de servidor",
      detalhes: error.message,
    });
  }
};

export const getConfessionById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await confessionsModel.findConfessionById(id);

    if (!data) {
      return res.status(404).json({
        total: 0,
        mensagem: "Não encontrado",
        detalhes: `Nenhuma confissão com o id ${id} foi encontrada`,
        dados: null,
      });
    }

    return res.status(200).json({
      total: 1,
      mensagem: `confissão com o id ${id} foi encontrada com sucesso`,
      dados: data,
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno de servidor",
      detalhes: error.message,
    });
  }
};

export const createConfession = async (req, res) => {
  try {
    const { message, message_type, recipient, sender } = req.body;

    const data = req.body;
    const requiredfields = ["message", "message_type", "recipient", "sender"];

    const missing = requiredfields.filter((field) => !data[field]);

    if (missing.length > 0) {
      return res.status(400).json({
        total: 0,
        mensagem: `Os seguintes campos são necessários: ${missing.join(", ")}.`,
        dados: null
      });
    }

    const normalizedMessage = message.trim().toLowerCase();
    const normalizedType = message_type.trim().toLowerCase();

    const badWords = process.env.BAD_WORDS.split(",").map(word => word.trim().toLowerCase());

    const containsBadWords = badWords.some((word) =>
      normalizedMessage.includes(word.toLowerCase())
    );

    if (containsBadWords) {
      return res.status(400).json({
        total: 0,
        mensagem: "A mensagem contém palavras ofensivas",
        dados: null
      });
    }

    const messageTypes = [
      "romântica",
      "amizade",
      "motivacional",
      "comédia",
      "reflexiva",
    ];

    const okMessageType = messageTypes.includes(normalizedType);

    if (!okMessageType) {
      return res.status(400).json({
        total: 0,
        mensagem: `OS tipos de mensagem que existem são: ${messageTypes.join(", ")}`,
        dados: null
      });
    }

    const newConfession = await confessionsModel.createConfession(req.body);

    return res.status(201).json({
      total: 1,
      mensagem: "Confissão criada com sucesso",
      dados: newConfession
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno de servidor",
      detalhes: error.message,
    });
  }
};

export const deleteConfession = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const confessionExists = await confessionsModel.findConfessionById(id);

    if (!confessionExists) {
      return res.status(404).json({
        total: 0,
        mensagem: "Não encontrado",
        detalhes: "Nenhuma confissão foi encontrada para deletar",
        id: id,
      });
    }

    await confessionsModel.deleteConfession(id);

    res.status(200).json({
      total: 1,
      mensagem: "Confissão deletada com sucesso",
      dados: data,
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro interno de servidor",
      detalhes: error.message,
    });
  }
};

export const updateConfession = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const { message, message_type, recipient, sender } = req.body;

    const confessionExists = await confessionsModel.findOneConfession(id);

    if (!confessionExists) {
      return res.status(404).json({
        total: 0,
        mensagem: "Não encontrado",
        detalhes: "Nenhuma confissão foi encontrada para atualizar",
        dados: null,
      });
    }

    const requiredfields = ["message", "message_type", "recipient", "sender"];

    const missing = requiredfields.filter((field) => !data[field]);

    if (missing.length > 0) {
      return res.status(400).json({
        total: 0,
        mensagem: `Os seguintes campos são necessários: ${missing.join(", ")}.`,
        dados: null
      });
    }

    const normalizedMessage = message.trim().toLowerCase();
    const normalizedType = message_type.trim().toLowerCase();

    const badWords = process.env.BAD_WORDS.split(",").map(word => word.trim().toLowerCase());

    const containsBadWords = badWords.some((word) =>
      normalizedMessage.includes(word.toLowerCase())
    );

    if (containsBadWords) {
      return res.status(400).json({
        total: 0,
        mensagem: "A mensagem contém palavras ofensivas",
        dados: null
      });
    }

    const messageTypes = [
      "romântica",
      "amizade",
      "motivacional",
      "comédia",
      "reflexiva",
    ];

    const okMessageType = messageTypes.includes(normalizedType);

    if (!okMessageType) {
      return res.status(400).json({
        total: 0,
        mensagem: `OS tipos de mensagem que existem são: ${messageTypes.join(", ")}`,
        dados: null
      });
    }

    const confessionUpdated = await confessionsModel.updateConfession(id, data);

    res.status(200).json({
      total: 1,
      mensagem: "Confissão atualizada com sucesso",
      dados: confessionUpdated
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro interno de servidor",
      detalhes: error.message,
    });
  }
};
