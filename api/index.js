import serverless from "serverless-http";
import app from "../backend/src/app.js";
import connectDB from "../backend/src/config/db.js";

let dbConnected = false;

async function ensureDBConnection() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
    console.log("MongoDB connected");
  }
}

const server = serverless(app);

export default async function handler(req, res) {
  try {
    // ✅ Handle CORS Preflight OPTIONS request (Very important for Vercel)
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.status(200).end();
    }

    // ✅ Ensure MongoDB connection
    await ensureDBConnection();

    // ✅ Pass request to Express server
    return server(req, res);

  } catch (error) {
    console.error("Serverless Handler Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}