import {Router} from "express";
import * as usuariosController from "../controllers/usuariosController.js";

const router = Router();

router.get("/", usuariosController.getAllUsuarios);
router.get("/:id", usuariosController.getUsuariosById);

export default router;