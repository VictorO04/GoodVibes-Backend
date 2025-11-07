import * as usersModels from "../models/usersModels.js";


//Parte que lista todos os usuarios
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
//Lista um usuario baseado em um id que vem na URL do site
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

//Parte do controller dedicada a criar um novo usuario

export const createNewUser = async (req, res) => {
    try{
        const {username, email, password, anonymous } = req.body
        const data = req.body
        const necessaireFields = ["username", "email", "password", "anonymous"];

        const lost = necessaireFields.filter((field)=> !data[field]) 

        if(lost.length>0){
            return res.status(400).json({
                error: `The following camps are missing: ${lost.join(", ")}`
            })
        }
        const newUser = await usersModels.createUser(req.body);

        res.status(201).json({
            message: "New user crated",
            user: newUser
        })
    }catch(error){
        res.status(500).json({
            error: "Internal server error",
            datails: error.message,
            status: 500
        })
    }
}