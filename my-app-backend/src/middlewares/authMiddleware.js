import jwt from "jsonwebtoken";
import { decodeToken } from "../repository/tokenRepository.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado, se requiere un token válido" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
