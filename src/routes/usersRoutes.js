import {Router} from "express";
import * as usersController from "../controllers/usersController.js";

const router = Router();

router.get("/", usersController.listAllUsers);


export default router;