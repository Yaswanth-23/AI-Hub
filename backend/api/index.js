import serverless from "serverless-http";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";

let isConnected = false;

// Connect to database only once
async function ensureDBConnection() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("MongoDB connected");
  }
}

const server = serverless(app);

export default async function handler(req, res) {
  await ensureDBConnection();
  return server(req, res);
}