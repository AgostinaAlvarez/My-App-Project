import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  addNewCommentInPost,
  getComentsByPost,
  verTodos,
} from "../controller/comentsController.js";

const router = Router();

router.get("/coments/get/:postId", authenticateToken, getComentsByPost);

router.post("/coments/add_new", authenticateToken, addNewCommentInPost);

//router.get("/vertodos", authenticateToken, verTodos);
export default router;
