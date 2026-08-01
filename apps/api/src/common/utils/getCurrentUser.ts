import { Request } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export const getCurrentUser = (req: Request) => {
  if (!req.user) {
    throw new UnauthorizedError("Authentication required");
  }

  return req.user;
};