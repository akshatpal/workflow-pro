import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { validate } from "../../../common/middleware/validate.middleware.js"
import { loginSchema } from "../validation/auth.validation.js";
import { authenticate } from "../../../common/middleware/auth.middleware.js";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  AuthController.login
);

router.post(
  "/refresh",
  AuthController.refresh
);

router.post(
  "/logout",
  AuthController.logout
);

router.get(
  "/me",
  authenticate,
  AuthController.me
);

export default router;