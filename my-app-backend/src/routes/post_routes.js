import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  createPost,
  getAllPostsByUserId,
  getMyPosts,
} from "../controller/postsController.js";

const router = Router();

//crear un post
router.post("/posts/create", authenticateToken, createPost);

//obtener toods mis posts
router.get("/posts/get", authenticateToken, getMyPosts);

//obtener todos los posts
// path = GET /posts?userId=123456&page=2&limit=5
router.get("/posts/get_by_user_id", authenticateToken, getAllPostsByUserId);

export default router;
