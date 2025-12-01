import {Router} from "express";
import * as usuariosController from "../controllers/usuariosController.js";

const router = Router();

router.get("/", usuariosController.getAllUsuarios);
router.get("/:id", usuariosController.getUsuariosById);
router.post("/", usuariosController.createUsuario);
router.delete("/:id", usuariosController.deleteUsuario);
router.put("/:id", usuariosController.updateUsuario);

export default router;