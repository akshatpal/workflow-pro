import { HydratedDocument } from "mongoose";
import { NotificationDocument } from "../model/notification.model.js";

export class NotificationDto {
  static toResponse(
    notification: HydratedDocument<NotificationDocument>
  ) {
    return {
      id: notification._id.toString(),

      title: notification.title,

      message: notification.message,

      type: notification.type,

      user: notification.user,

      sender: notification.sender,

      entityId: notification.entityId,

      entityType: notification.entityType,

      isRead: notification.isRead,

      createdAt: notification.createdAt,
    };
  }

  static toResponseArray(
    notifications: HydratedDocument<NotificationDocument>[]
  ) {
    return notifications.map((notification) =>
      this.toResponse(notification)
    );
  }
}