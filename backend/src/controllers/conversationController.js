import Conversation from "../models/Conversation.js";
import Groq from "groq-sdk";

// Initialize Groq once
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Create new conversation
export const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      user: req.user._id,
      messages: [],
    });

    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create conversation" });
  }
};

// Get all conversations for user
export const getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      user: req.user._id,
    }).sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch conversations" });
  }
};

// Get single conversation
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
    console.error(error);
    res.status(500).json({ message: "Error fetching conversation" });
  }
};

// Send message and get AI reply
export const addMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const userId = req.user._id;

    let conversation;

    // Find existing conversation
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        user: userId,
      });
    }

    // Create new conversation if not found
    if (!conversation) {
      conversation = await Conversation.create({
        user: userId,
        title: content.slice(0, 30),
        messages: [],
      });
    }

    // Add user message
    conversation.messages.push({
      role: "user",
      content,
    });

    // Get AI response from Groq
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: conversation.messages,
    });

    const aiReply = completion.choices[0].message.content;

    // Add AI response
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