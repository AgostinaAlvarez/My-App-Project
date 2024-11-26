import { Router } from "express";
import {
  getUserByToken,
  loginUser,
  registerUser,
} from "../controller/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

//login de usuario
router.post("/login", loginUser);

//autorizar token
router.get("/access_token", authenticateToken, getUserByToken);

export default router;
