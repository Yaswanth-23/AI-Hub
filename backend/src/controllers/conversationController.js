import Conversation from "../models/Conversation.js";
import axios from "axios";

export const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      user: req.user._id,
    });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create conversation" });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      user: req.user._id,
    }).sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch conversations" });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversation" });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const userId = req.user._id;

    let conversation;

    // 1️⃣ If conversation exists, find it
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        user: userId,
      });
    }

    // 2️⃣ If not found, create new one
    if (!conversation) {
      conversation = await Conversation.create({
        user: userId,
        title: content.slice(0, 30), // Auto title
        messages: [],
      });
    }

    // 3️⃣ Add user message
    conversation.messages.push({
      role: "user",
      content,
    });

    // 4️⃣ Call Ollama (🔥 UPDATED MODEL)
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "gemma3:1b",
        prompt: content,
        stream: false,
      }
    );

    const aiReply = response.data.response;

    // 5️⃣ Add AI reply
    conversation.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await conversation.save();

    res.json({
      conversationId: conversation._id,
      messages: conversation.messages,
      title: conversation.title,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};