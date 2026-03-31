const Message = require("../models/Message");

// @desc    Send a message
// @route   POST /api/messages
const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully! We will get back to you soon.",
      data: newMessage,
    });
  } catch (error) {
    console.error("sendMessage error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("getMessages error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc    Update message status (Admin)
// @route   PATCH /api/messages/:id/resolve
const resolveMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.status = "resolved";
    await message.save();

    res.json({ message: "Message marked as resolved", data: message });
  } catch (error) {
    console.error("resolveMessage error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

// @desc    Delete a message (Admin)
// @route   DELETE /api/messages/:id
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("deleteMessage error:", error.message);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  resolveMessage,
  deleteMessage,
};
