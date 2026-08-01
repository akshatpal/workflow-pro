import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authentication required"));
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = verifyAccessToken(token);

    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};