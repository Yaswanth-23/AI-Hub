import serverless from "serverless-http";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";

let isConnected = false;

async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("MongoDB connected");
  }

  return serverless(app)(req, res);
}

export default handler;