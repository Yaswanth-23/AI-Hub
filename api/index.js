import serverless from "serverless-http";
import app from "../backend/src/app.js";
import connectDB from "../backend/src/config/db.js";

let dbConnected = false;

async function ensureDBConnection() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}

const server = serverless(app);

export default async function handler(req, res) {
  const origin = req.headers.origin || "*";

  // ⭐ Handle OPTIONS preflight (CRITICAL FOR VERCEL)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    return res.status(200).end();
  }

  await ensureDBConnection();

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");

  return server(req, res);
}