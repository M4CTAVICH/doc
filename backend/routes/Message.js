import express from "express";
import {
  postMessage,
  fetchMessages,
  fetchUnreadCount,
  markAsRead,
} from "../controllers/Message.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, authorize(["doctor"]), postMessage);
router.get("/", authenticate, authorize(["assistant"]), fetchMessages);
router.get(
  "/unread-count",
  authenticate,
  authorize(["assistant"]),
  fetchUnreadCount
);
router.post("/:id/read", authenticate, authorize(["assistant"]), markAsRead);

export default router;
