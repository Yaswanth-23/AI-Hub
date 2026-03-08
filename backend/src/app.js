import express from "express";
import cors from "cors";
import billingRoutes from "./routes/billingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin.js";
import conversationRoutes from "./routes/conversationRoutes.js";

const app = express();

const corsOptions = {
  origin: true, // allow all origins (safe for API usage)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight

// Stripe webhook needs raw body
app.use("/api/billing/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/conversations", conversationRoutes);

export default app;