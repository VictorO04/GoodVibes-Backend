import { Router } from "express";
import * as confessionsController from "./../controllers/confessionsController.js";

const router = Router();

router.get("/", confessionsController.getAllConfessions);
router.get("/:id", confessionsController.getConfessionById);
router.post("/", confessionsController.createConfession);
router.delete("/:id", confessionsController.deleteConfession);
router.put("/:id", confessionsController.updateConfession);

export default router;