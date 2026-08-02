import { NotificationType } from "../model/notification.model.js";

export interface CreateNotificationInput {
  user: string;

  sender?: string;

  title: string;

  message: string;

  type: NotificationType;

  entityId?: string;

  entityType?: string;
}

export interface NotificationQuery {
  page?: number;

  limit?: number;

  unread?: boolean;
}