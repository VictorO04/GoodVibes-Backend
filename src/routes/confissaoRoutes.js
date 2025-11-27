import { Router } from "express";
import * as confissaoController from "./../controllers/confissaoController.js";

const router = Router();

router.get("/", confissaoController.getAllConfissoes);
router.get("/:id", confissaoController.getConfissaoByID);
router.post("/", confissaoController.createConfissao);
router.delete("/:id", confissaoController.deleteConfissao);
router.put("/:id", confissaoController.updateConfession);

export default router;