import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import {
  getConversations,
  getConversationById,
} from "../services/conversationService";

export default function Workspace() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewChat = () => {
    setActiveConversation(null);
    setMessages([]);
    setInput("");
    setSidebarOpen(false);
  };

  const handleSelectChat = async (id) => {
    try {
      const chat = await getConversationById(id);
      setActiveConversation(chat);
      setMessages(chat.messages || []);
      setSidebarOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/conversations/message`,
        {
          conversationId: activeConversation?._id,
          content: userMessage.content,
          model: "gemma3:1b",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(data.messages);
      setActiveConversation({
        _id: data.conversationId,
        title: data.title,
      });

      fetchConversations();
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative h-full w-full text-white">

      {/* CHATS BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-6 left-6 z-30 px-4 py-2 text-sm bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full transition"
      >
        Chats
      </button>

      {/* OVERLAY SIDEBAR (STARTS AFTER MAIN SIDEBAR w-64) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dark overlay ONLY on workspace area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              style={{ left: "16rem" }} 
            />

            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 h-full w-80 z-50 backdrop-blur-2xl bg-white/5 p-6 flex flex-col gap-6"
              style={{ left: "16rem" }} 
            >
              <button
                onClick={handleNewChat}
                className="py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
              >
                + New Chat
              </button>

              <div className="flex-1 overflow-y-auto space-y-3">
                {conversations.map((conv) => (
                  <div
                    key={conv._id}
                    onClick={() => handleSelectChat(conv._id)}
                    className={`text-sm cursor-pointer px-3 py-2 rounded-lg transition ${
                      activeConversation?._id === conv._id
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                  >
                    {conv.title || "Untitled"}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MESSAGES */}
      <div className="h-full overflow-y-auto px-6 md:px-20 pt-24 pb-52 space-y-10">
        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-4xl text-base leading-relaxed ${
                msg.role === "user"
                  ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 rounded-3xl"
                  : "bg-white/5 px-6 py-4 rounded-3xl"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </motion.div>
          ))
        ) : (
          <div className="h-[60vh] flex items-center justify-center text-white/30 text-xl">
            Ask anything to begin
          </div>
        )}

        {isTyping && (
          <div className="text-white/40 text-sm">AI is typing...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* LARGE FLOATING INPUT */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full px-6 z-30">
        <div className="max-w-5xl mx-auto backdrop-blur-2xl bg-white/5 px-8 py-5 rounded-3xl flex gap-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent outline-none text-lg"
            placeholder="Ask anything..."
          />
          <button
            onClick={handleSend}
            className="px-10 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}