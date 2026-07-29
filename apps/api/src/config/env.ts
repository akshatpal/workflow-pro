import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT ?? "5000",

  MONGO_URI: process.env.MONGO_URI ?? "",

  JWT_SECRET: process.env.JWT_SECRET ?? "",

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "",

  ACCESS_TOKEN_EXPIRES: (process.env.ACCESS_TOKEN_EXPIRES ?? "15m") as "15m",

  REFRESH_TOKEN_EXPIRES: (process.env.REFRESH_TOKEN_EXPIRES ?? "7d") as "7d",
} as const;