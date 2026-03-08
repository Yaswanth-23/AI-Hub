import serverless from "serverless-http";
import app from "../backend/src/app.js";
import connectDB from "../backend/src/config/db.js";

let dbConnected = false;

async function ensureDBConnection() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
    console.log("✅ MongoDB connected");
  }
}

const server = serverless(app);

export default async function handler(req, res) {
  try {
    const origin = req.headers.origin || "*";

    // 🔹 Handle OPTIONS preflight for all routes
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      return res.status(200).end();
    }

    // 🔹 Ensure MongoDB connection
    await ensureDBConnection();

    // 🔹 Set CORS headers for actual requests
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // 🔹 Pass request to Express app
    return server(req, res);

  } catch (error) {
    console.error("Serverless Handler Error:", error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}