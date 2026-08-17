export enum NotificationType {
  TASK_ASSIGNED = "TASK_ASSIGNED",
  TASK_UPDATED = "TASK_UPDATED",
  TASK_COMMENTED = "TASK_COMMENTED",
  PROJECT_INVITE = "PROJECT_INVITE",
  BOARD_CREATED = "BOARD_CREATED",
}

export interface Notification {
  id: string;

  title: string;

  message: string;

  type: NotificationType;

  isRead: boolean;

  user: string;

  referenceId?: string;

  createdAt: string;

  updatedAt: string;
}

export interface NotificationResponse {
  notifications: Notification[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface UnreadCountResponse {
  unread: number;
}

export interface CreateNotificationRequest {
  user: string;        // recipient _id
  title: string;
  message: string;
  type: string;        // NotificationType value
  sender?: string;
  entityId?: string;
  entityType?: string;
}