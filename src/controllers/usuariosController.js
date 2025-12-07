//importação do que é usado
import * as usuariosModel from "../models/usuariosModel.js";
import bcrypt from "bcrypt";

//get all usuários
export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.findAllUsuarios();

        //mensagem de status 200 com operador ternário para verificar se há dados no banco
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

//get usuários by id
export const getUsuariosById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        //verica se é um número, se não for, erro 400
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const usuario = await usuariosModel.findUsuarioById(id);

        //verica existe com o id digitado, se não, erro 404
        if (!usuario) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhum usuário com o id ${id} encontrado`
            });
        }


        //mensagem de sucesso
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

//create usuário
export const createUsuario = async (req, res) => {
    try {
        //constantes para puxar body
        const data = req.body;
        const { nomeUsuario, email, senha, anonimo } = data;

        //verificação de campos obrigatórios, se faltar campos, erro 400
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

        
        //criação do hash da senha usando o bcrypt
        const hashSenha = await bcrypt.hash(data.senha, 10);

        //se usuário anonimo true, substitue o nome de usuário por um dos emojis do array de forma aleatória
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

        //mensagem de sucesso
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

//delete usuário
export const deleteUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        //verica se é um número, se não for, erro 400
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const usuarioExiste = await usuariosModel.findUsuarioById(id);

        //verica existe com o id digitado, se não, erro 404
        if (!usuarioExiste) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhum usuário com o id ${id} encontrado`
            });
        }

        await usuariosModel.deleteUsuario(id);

        //mensagem de sucesso
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
        //constantes para puxar body e id
        const id = parseInt(req.params.id);
        const data = req.body;

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                total: 0,
                mensagem: "O id precisa ser válido"
            });
        }

        const usuarioExistente = await usuariosModel.findUsuarioById(id);

        //verica existe com o id digitado, se não, erro 404
        if (!usuarioExistente) {
            return res.status(404).json({
                total: 0,
                mensagem: `Nenhum usuário com o id ${id} encontrado`
            });
        }

        const { nomeUsuario, email, senha, anonimo } = data;

        //criação do hash da senha usando o bcrypt caso o usuário queira editá-la
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

        //se usuário anonimo true, substitue o nome de usuário por um dos emojis do array de forma aleatória
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

        //mensagem de sucesso
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