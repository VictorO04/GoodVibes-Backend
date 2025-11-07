import * as usersModels from "../models/usersModels.js";

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
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      datails: error.message,
      status: 500,
    });
  }
};
