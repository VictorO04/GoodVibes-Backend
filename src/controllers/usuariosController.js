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

        const camposObrigatorios = ["nomeUsuario", "email", "senha"];

        const faltando = camposObrigatorios.filter((campo) => !data[campo] && data[campo] !== 0);

        if (faltando.length > 0) {
            return res.status(400).json({
                total: 0,
                mensagem: `Os seguintes campos são obrigatórios:  ${faltando.join(", ")}`
            });
        }

        const hashSenha = await bcrypt.hash(data.senha, 10);

        const novoUsuario = await usuariosModel.createUsuario({
            nomeUsuario,
            email,
            senha: hashSenha,
            anonimo: anonimo ?? false
        });

        delete novoUsuario.senha;

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