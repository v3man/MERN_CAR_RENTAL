const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  resolveMessage,
  deleteMessage,
} = require("../controllers/messageController");
const { protect, authorize } = require("../middleware/auth");

// Public route to send messages
router.post("/", sendMessage);

// Admin routes to manage messages
router.get("/", protect, authorize("admin"), getMessages);
router.patch("/:id/resolve", protect, authorize("admin"), resolveMessage);
router.delete("/:id", protect, authorize("admin"), deleteMessage);

module.exports = router;
