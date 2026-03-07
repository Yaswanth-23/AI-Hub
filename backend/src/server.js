import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env only for local development
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: path.resolve(__dirname, "../.env"),
  });
}

import app from "./app.js";
import connectDB from "./config/db.js";

// Register routes
app.use("/api/user", userRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/conversations", conversationRoutes);

// Debug logs
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
console.log("Mongo URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();