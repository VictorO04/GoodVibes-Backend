import { Router } from "express";
import * as confissaoController from "./../controllers/confissaoController.js";

const router = Router();

router.get("/", confissaoController.getAllConfissoes);
router.get("/:id", confissaoController.getConfissaoByID);

export default router;