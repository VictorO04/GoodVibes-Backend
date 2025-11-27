import * as usuariosModel from "../models/usuariosModel.js";

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

export const createUser = async (req, res) => {
  try {
    const { username, email, password, anonymous } = req.body;

    const data = req.body;
    const missingFields = ["username", "email", "password", "anonymous"];

    const lost = missingFields.filter((field) => !data[field]);

    if (lost.length > 0) {
      return res.status(400).json({
        error: `the following fields are required: ${lost.join(", ")}.`,
      });
    }

    const newUser = await usersModels.createUser(req.body);

    res.status(201).json({
      message: "New user created",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
      details: error.message,
      status: 500,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userExists = await usersModels.findOneUser(id);

    if (!userExists) {
      return res.status(404).json({
        error: "User not founded",
        id: id,
      });
    }
    await usersModels.deleteUser(id);

    res.status(200).json({
      message: "The user got deleted",
      user: userExists,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
      status: 500,
    });
  }
};
