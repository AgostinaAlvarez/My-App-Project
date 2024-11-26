import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getConversations } from "../controller/conversationController.js";

const router = Router();

router.get("/conversations/get-all", authenticateToken, getConversations);

export default router;
