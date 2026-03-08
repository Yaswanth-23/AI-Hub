import serverless from "serverless-http";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";

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
  await ensureDBConnection();
  return server(req, res);
}