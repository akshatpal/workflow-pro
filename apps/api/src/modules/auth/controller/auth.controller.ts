import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      return successResponse(
        res,
        200,
        "Login successful",
        result
      );
    } catch (error) {
      next(error);
    }
  }
}