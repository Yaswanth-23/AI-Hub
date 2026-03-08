import express from "express";
import cors from "cors";
import billingRoutes from "./routes/billingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin.js";
import conversationRoutes from "./routes/conversationRoutes.js";

const app = express();

// 🔹 Enable CORS for all origins dynamically
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors());

// Stripe webhook
app.use("/api/billing/webhook", express.raw({ type: "application/json" }));

// JSON parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/conversations", conversationRoutes);

export default app;