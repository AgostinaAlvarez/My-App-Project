import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  getMessagesBetweenUsers,
  getUnreadMessagesCount,
  markMessageAsRead,
  markMessagesAsReceived,
  sendMessage,
  sendMessageUpdate,
} from "../controller/messageController.js";

const router = Router();

router.post("/message/send", authenticateToken, sendMessage);
router.post("/message/send_up", authenticateToken, sendMessageUpdate);

router.put("/message/read/:messageId", authenticateToken, markMessageAsRead);

router.get(
  "/messages/get-unread-messages-count",
  authenticateToken,
  getUnreadMessagesCount
);

router.put(
  "/message/mark-all-non-recibed",
  authenticateToken,
  markMessagesAsReceived
);

router.get(
  "/messages/chat/:userId",
  authenticateToken,
  getMessagesBetweenUsers
);

export default router;
