import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";
import { getCurrentUser } from "../../../common/utils/getCurrentUser.js";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {

        const { email, password } = req.body;

        const result = await AuthService.login(
            email,
            password
        );

        const { refreshToken, ...data } = result;

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return successResponse(
            res,
            200,
            "Login successful",
            data
        );

    } catch (error) {
        next(error);
    }
  }
  static async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {

        const refreshToken =
            req.cookies.refreshToken;

        const result =
            await AuthService.refresh(refreshToken);

        return successResponse(
            res,
            200,
            "Token refreshed",
            result
        );

    } catch (error) {
        next(error);
    }
  }

  static async logout(
    _req: Request,
    res: Response
  ) {

    res.clearCookie("refreshToken");

    return successResponse(
        res,
        200,
        "Logout successful"
    );
  }

  static async me(
  req: Request,
  res: Response,
  next: NextFunction
  ) {
    try {

      const currentUser = getCurrentUser(req);

      const user = await AuthService.me(currentUser.userId);

      return successResponse(
        res,
        200,
        "User fetched successfully",
        user
      );

    } catch (error) {
      next(error);
    }
  }
}