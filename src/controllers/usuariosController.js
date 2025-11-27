import * as usuariosModel from "../models/usuariosModel.js";

export const listAllUsers = async (req, res) => {
  try {
    const users = await usersModels.findAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({
        total: 0,
        message: "There are no users on the list 😢",
        users,
      });
    }
    res.status(200).json({
      total: users.length,
      message: "Users list: ",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "internal server error: ",
      details: error.message,
      status: 500,
    });
  }
};

export const listOneUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await usersModels.findOneUser(id);

    if (!user) {
      return res.status(404).json({
        error: "User not founded",
        message: "Check the id again",
        id: id,
      });
    }
    return res.status(200).json({
      message: "id founded",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      details: error.message,
      status: 500,
    });
  }
};

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
