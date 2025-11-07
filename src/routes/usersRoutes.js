import {Router} from "express";
import * as usersController from "../controllers/usersController.js";

const router = Router();

router.get("/", usersController.listAllUsers);
router.get("/:id", usersController.listOneUser);


export default router;