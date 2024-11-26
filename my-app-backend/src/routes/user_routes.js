import { Router } from "express";
import {
  getUserByToken,
  loginUser,
  registerUser,
} from "../controller/authController.js";
import { getUserById, searchUsers } from "../controller/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Ruta de registro de usuario
router.post("/register", registerUser);

// Ruta de inicio de sesión de usuario
router.post("/login", loginUser);

//Ruta para buscar usuario
router.post("/search", authenticateToken, searchUsers);

//Autenticar usuario
router.get("/auth", authenticateToken, getUserByToken);

//Buscar un usuario por id
router.get("/user/getbyid/:userId", authenticateToken, getUserById);

export default router;
