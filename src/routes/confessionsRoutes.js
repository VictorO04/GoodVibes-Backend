import { Router } from "express";
import * as confessionsController from "./../controllers/confessionsController.js";

const router = Router();

router.get("/", confessionsController.listAll);
router.get("/:id", confessionsController.listOne);

export default router;