import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDatabase = async () => {
  try {
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {
      // Ignore if DNS override is restricted
    }

    await mongoose.connect(env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};