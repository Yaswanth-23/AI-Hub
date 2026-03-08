import express from "express";
import cors from "cors";
import billingRoutes from "./routes/billingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin.js";
import conversationRoutes from "./routes/conversationRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://ai-indol-kappa.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

// Stripe webhook needs raw body
app.use("/api/billing/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

// Health check route
app.get("/api", (req, res) => {
  res.json({ message: "API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/conversations", conversationRoutes);

export default app;