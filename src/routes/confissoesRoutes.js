import { Router } from "express";
import * as confissoesController from "../controllers/confissoesController.js";

const router = Router();

router.get("/", confissoesController.getAllConfissoes);
router.get("/tipo/:tipo", confissoesController.getConfissaoByTipo);
router.get("/anonimas", confissoesController.getConfissoesAnonimas);
router.get("/:id", confissoesController.getConfissaoByID);
router.post("/", confissoesController.createConfissao);
router.delete("/:id", confissoesController.deleteConfissao);
router.put("/:id", confissoesController.updateConfissao);

export default router;