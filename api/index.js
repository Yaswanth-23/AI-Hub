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
  try {
    await ensureDBConnection();

    const origin = req.headers.origin || "*";

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");

    return server(req, res);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}