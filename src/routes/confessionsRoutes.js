import { Router } from "express";
import * as confessionsController from "./../controllers/confessionsController.js";

const router = Router();

router.get("/", confessionsController.listAllConfessions);
router.get("/:id", confessionsController.listOneConfession);
router.post("/", confessionsController.createConfession);

export default router;