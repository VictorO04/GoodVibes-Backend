import * as usuariosModel from "../models/usuariosModel.js";
import bcrypt from "bcrypt";

export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.findAllUsuarios();

        res.status(200).json({
            total: usuarios.length,
            mensagem: usuarios.length === 0
                ? "Não há usuários na lista"
                : "Lista de usuários encontrada",
            usuarios: usuarios
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

  }
}

export const getUsuariosById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const usuario = await usuariosModel.findUsuarioById(id);

        if (!usuario) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhum usuário com o id ${id} encontrado`
            });
        }

        res.status(200).json({
            total: 1,
            mensagem: `Usuário com o id ${id} encontrado`,
            usuario: usuario
        });
        
    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

export const createUsuario = async (req, res) => {
    try {
        const data = req.body;
        const { nomeUsuario, email, senha, anonimo } = data;

        const camposObrigatorios = ["email", "senha"];

        if (!anonimo) {
          camposObrigatorios.push("nomeUsuario");
        }

        const faltando = camposObrigatorios.filter((campo) => !data[campo] && data[campo] !== 0);

        if (faltando.length > 0) {
            return res.status(400).json({
                total: 0,
                mensagem: `Os seguintes campos são obrigatórios:  ${faltando.join(", ")}`
            });
        }

        const hashSenha = await bcrypt.hash(data.senha, 10);

        const emojis = ["😶", "👤", "🕵️", "👽", "🐧", "🦊", "🐼", "🐸", "🐵", "🐱"];

        let nomeFinal = nomeUsuario;

        if (anonimo === true) {
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            nomeFinal = emoji;
        }

        const novoUsuario = await usuariosModel.createUsuario({
            nomeUsuario: nomeFinal,
            email,
            senha: hashSenha,
            anonimo: anonimo ?? false
        });

        res.status(201).json({
            total: 1,
            mensagem: "Usuário criado com sucesso",
            usuario: novoUsuario
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const usuarioExiste = await usuariosModel.findUsuarioById(id);

        if (!usuarioExiste) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhum usuário com o id ${id} encontrado`
            });
        }

        await usuariosModel.deleteUsuario(id);

        res.status(200).json({
            total: 1,
            mensagem: "Usuário deletado com sucesso",
            usuario: usuarioExiste
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
        });

    }
}

export const updateUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const usuarioExistente = await usuariosModel.findUsuarioById(id);

        if (!usuarioExistente) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhum usuário com o id ${id} encontrado`
            });
        }

        const { nomeUsuario, email, senha, anonimo } = data;

        let hashSenha;
        if (senha) {
            if (senha.length < 6) {
                return res.status(400).json({
                    total: 0,
                    mensagem: "A senha deve ter pelo menos 6 caracteres"
                });
            }
            hashSenha = await bcrypt.hash(senha, 10);
        }

        let nomeFinal = nomeUsuario ?? usuarioExistente.nomeUsuario;
        if (anonimo === true) {
            const emojis = ["😶", "👤", "🕵️", "👽", "🐧", "🦊", "🐼", "🐸", "🐵", "🐱"];
            nomeFinal = emojis[Math.floor(Math.random() * emojis.length)];
        }

        const dadosAtualizados = {
            nomeUsuario: nomeFinal,
            email: email ?? usuarioExistente.email,
            senha: hashSenha ?? usuarioExistente.senha,
            anonimo: anonimo ?? usuarioExistente.anonimo
        };

        const usuarioAtualizado = await usuariosModel.updateUsuario(id, dadosAtualizados);

        const { senha: senhaRemovida, ...usuarioSemSenha } = usuarioAtualizado;

        res.status(200).json({
            total: 1,
            mensagem: `Usuário com id ${id} atualizado com sucesso`,
            usuario: usuarioSemSenha
        });

    } catch (error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message
        });
    }
};