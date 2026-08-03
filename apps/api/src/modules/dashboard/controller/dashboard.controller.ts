import {
  Request,
  Response,
  NextFunction,
} from "express";

import { DashboardService } from "../service/dashboard.service.js";

import { successResponse } from "../../../common/response/apiResponse.js";

import { getCurrentUser } from "../../../common/utils/getCurrentUser.js";

export class DashboardController {
  static async dashboard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user =
        getCurrentUser(req);

      const data =
        await DashboardService.getDashboard(
          user.userId
        );

      return successResponse(
        res,
        200,
        "Dashboard fetched successfully",
        data
      );
    } catch (error) {
      next(error);
    }
  }

  static async statistics(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await DashboardService.getStatistics();

      return successResponse(
        res,
        200,
        "Statistics fetched successfully",
        data
      );
    } catch (error) {
      next(error);
    }
  }

  static async recentProjects(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await DashboardService.getRecentProjects();

      return successResponse(
        res,
        200,
        "Recent projects fetched successfully",
        data
      );
    } catch (error) {
      next(error);
    }
  }

  static async myTasks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user =
        getCurrentUser(req);

      const data =
        await DashboardService.getMyTasks(
          user.userId
        );

      return successResponse(
        res,
        200,
        "Tasks fetched successfully",
        data
      );
    } catch (error) {
      next(error);
    }
  }

  static async recentActivities(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user =
        getCurrentUser(req);

      const data =
        await DashboardService.getRecentActivities(
          user.userId
        );

      return successResponse(
        res,
        200,
        "Activities fetched successfully",
        data
      );
    } catch (error) {
      next(error);
    }
  }
}