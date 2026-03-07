import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import path from "path";
import { fileURLToPath } from "url";

import app from "./app.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register API routes
app.use("/api/user", userRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/conversations", conversationRoutes);

// Debug environment variables
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Missing");
console.log("Mongodb URI:", process.env.MONGODB_URI ? "Loaded" : "Missing");
console.log("Groq Key:", process.env.GROQ_API_KEY ? "Loaded" : "Missing");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();