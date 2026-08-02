import {
  Request,
  Response,
  NextFunction,
} from "express";

import { NotificationService } from "../service/notification.service.js";
import { successResponse } from "../../../common/response/apiResponse.js";

export class NotificationController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notification =
        await NotificationService.createNotification(
          req.body
        );

      return successResponse(
        res,
        201,
        "Notification created successfully",
        notification
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data =
        await NotificationService.getNotifications(
          req.params.userId as string,
          {
            page: req.query.page
              ? Number(req.query.page)
              : 1,

            limit: req.query.limit
              ? Number(req.query.limit)
              : 20,

            unread:
              req.query.unread === "true",
          }
        );

      return successResponse(
        res,
        200,
        "Notifications fetched successfully",
        data
      );
    } catch (error) {
      next(error);
    }
  }

  static async markRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notification =
        await NotificationService.markAsRead(
          req.params.id as string
        );

      return successResponse(
        res,
        200,
        "Notification marked as read",
        notification
      );
    } catch (error) {
      next(error);
    }
  }

  static async markAllRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await NotificationService.markAllAsRead(
          req.params.userId as string
        );

      return successResponse(
        res,
        200,
        result.message
      );
    } catch (error) {
      next(error);
    }
  }

  static async unreadCount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await NotificationService.unreadCount(
          req.params.userId as string
        );

      return successResponse(
        res,
        200,
        "Unread count fetched",
        result
      );
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await NotificationService.deleteNotification(
          req.params.id as string
        );

      return successResponse(
        res,
        200,
        result.message
      );
    } catch (error) {
      next(error);
    }
  }
}