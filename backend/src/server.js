import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 FORCE LOAD ENV FROM BACKEND ROOT
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import app from "./app.js";
import connectDB from "./config/db.js";

// ✅ Register User Routes
app.use("/api/user", userRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/conversations", conversationRoutes);

console.log("Stripe Key After Fix:", process.env.STRIPE_SECRET_KEY);

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