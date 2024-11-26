import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addSave } from "../controller/saveController.js";

const router = Router();

router.post("/save/add_new", authenticateToken, addSave);

export default router;
