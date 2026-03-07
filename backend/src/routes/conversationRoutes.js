import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserConversations,
  getConversationById,
  addMessage
} from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", protect, getUserConversations);
router.get("/:id", protect, getConversationById);
router.post("/:id/message", protect, addMessage);
router.post("/message", protect, addMessage);

export default router;