import { HydratedDocument } from "mongoose";
import { Notification, NotificationDocument } from "../model/notification.model.js";
import { NotificationDto } from "../dto/notification.dto.js";

import {
  CreateNotificationInput,
  NotificationQuery,
} from "../types/notification.types.js";

import { UserModel } from "../../user/model/user.model.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";

import { getIO } from "../../../socket/socket.js";

export class NotificationService {
  static async createNotification(
    payload: CreateNotificationInput
  ) {
    const user = await UserModel.findById(payload.user);

    if (!user || !user.isActive) {
      throw new NotFoundError("User not found");
    }

    const notification =
        await Notification.create({
        user: payload.user,
        sender: payload.sender,
        title: payload.title,
        message: payload.message,
        type: payload.type,
        entityId: payload.entityId,
        entityType: payload.entityType,
    });

    getIO()
    .to(payload.user)
    .emit(
        "notification:new",
        NotificationDto.toResponse(notification as unknown as HydratedDocument<NotificationDocument>)
    );

    return NotificationDto.toResponse(notification as unknown as HydratedDocument<NotificationDocument>);
  }

  static async getNotifications(
    userId: string,
    query: NotificationQuery
  ) {
    const {
      page = 1,
      limit = 20,
      unread,
    } = query;

    const filter: any = {
      user: userId,
      isDeleted: false,
    };

    if (unread) {
      filter.isRead = false;
    }

    const skip = (page - 1) * limit;

    const notifications = await Notification.find(filter)
      .populate(
        "sender",
        "name email profilePic"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total =
      await Notification.countDocuments(filter);

    return {
      notifications:
        NotificationDto.toResponseArray(
          notifications as unknown as HydratedDocument<NotificationDocument>[]
        ),

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(
          total / limit
        ),
      },
    };
  }

  static async markAsRead(id: string) {
    const notification =
      await Notification.findById(id);

    if (
      !notification ||
      notification.isDeleted
    ) {
      throw new NotFoundError(
        "Notification not found"
      );
    }

    notification.isRead = true;

    await notification.save();

    return NotificationDto.toResponse(
      notification as unknown as HydratedDocument<NotificationDocument>
    );
  }

  static async markAllAsRead(
    userId: string
  ) {
    await Notification.updateMany(
      {
        user: userId,
        isRead: false,
        isDeleted: false,
      },
      {
        isRead: true,
      }
    );

    return {
      message:
        "All notifications marked as read",
    };
  }

  static async unreadCount(
    userId: string
  ) {
    const count =
      await Notification.countDocuments({
        user: userId,
        isRead: false,
        isDeleted: false,
      });

    return {
      unread: count,
    };
  }

  static async deleteNotification(
    id: string
  ) {
    const notification =
      await Notification.findById(id);

    if (
      !notification ||
      notification.isDeleted
    ) {
      throw new NotFoundError(
        "Notification not found"
      );
    }

    notification.isDeleted = true;

    await notification.save();

    return {
      message:
        "Notification deleted successfully",
    };
  }
}