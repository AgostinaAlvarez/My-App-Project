import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { addLike } from "../controller/likesController.js";

const router = Router();

router.post("/likes/add_new", authenticateToken, addLike);

/*
posts/get_by_user_id?userId=673a4e69e1ee8c979350e951&page=1&limit=10
*/

export default router;
