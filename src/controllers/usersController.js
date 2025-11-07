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
