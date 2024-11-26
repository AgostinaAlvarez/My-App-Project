import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  getPendingRequests,
  getUserFriends,
  respondToFriendRequest,
  sendFriendRequest,
  unfollowUser,
} from "../controller/friendshipController.js";

const router = Router();

router.post("/friendship/new", authenticateToken, sendFriendRequest);

router.get(
  "/friendship/get-all-friend-requests",
  authenticateToken,
  getPendingRequests
);

router.put(
  "/friendship/handleStatus",
  authenticateToken,
  respondToFriendRequest
);

//obtener los amigos del usuario
// GET /friends/64e3bda1d2c9e4a5aaf2b68e/get-friends?limit=10&page=2

router.get("/friends/:userId/get-friends", authenticateToken, getUserFriends);

router.post("/friends/unfolow", authenticateToken, unfollowUser);

export default router;
