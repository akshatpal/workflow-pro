import { CurrentUser } from "../auth.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: CurrentUser;
    }
  }
}

export {};