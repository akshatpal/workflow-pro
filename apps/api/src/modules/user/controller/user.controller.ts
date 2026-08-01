import { NextFunction, Request, Response } from "express";

import { UserService } from "../service/user.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class UserController {
  static async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await UserService.getUsers({
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        search: req.query.search as string,
        role: req.query.role as any,
        sortBy: req.query.sortBy as string,
        order: req.query.order as "asc" | "desc",
      });

      return successResponse(
        res,
        200,
        "Users fetched successfully",
        result
      );
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.getUserById(req.params.id as string);

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

  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.updateUser(
        req.params.id as string,
        req.body
      );

      return successResponse(
        res,
        200,
        "User updated successfully",
        user
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await UserService.deleteUser(req.params.id as string);

      return successResponse(
        res,
        200,
        "User deleted successfully",
        {}
      );
    } catch (error) {
      next(error);
    }
  }

  static async getProjectManagers(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const managers =
        await UserService.getProjectManagers();

      return successResponse(
        res,
        200,
        "Project managers fetched successfully",
        managers
      );
    } catch (error) {
      next(error);
    }
  }

  static async getEmployees(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employees =
        await UserService.getEmployees();

      return successResponse(
        res,
        200,
        "Employees fetched successfully",
        employees
      );
    } catch (error) {
      next(error);
    }
  }
}