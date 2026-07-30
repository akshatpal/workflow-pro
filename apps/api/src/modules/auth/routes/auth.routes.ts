import { Router } from "express";
import { AuthController } from "../controller/auth.controller.js";
import { validate } from "../../../common/middleware/validate.middleware.js"
import { loginSchema } from "../validation/auth.validation.js";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  AuthController.login
);

export default router;