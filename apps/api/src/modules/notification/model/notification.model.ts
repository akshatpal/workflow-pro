import { Schema, model, InferSchemaType } from "mongoose";

export enum NotificationType {
  TASK_ASSIGNED = "TASK_ASSIGNED",
  TASK_UPDATED = "TASK_UPDATED",
  TASK_COMMENT = "TASK_COMMENT",
  TASK_MENTION = "TASK_MENTION",
  PROJECT_INVITE = "PROJECT_INVITE",
  PROJECT_REMOVED = "PROJECT_REMOVED",
  SYSTEM = "SYSTEM",
}

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },

    entityId: {
      type: Schema.Types.ObjectId,
      default: null,
    },

    entityType: {
      type: String,
      default: "",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type NotificationDocument =
  InferSchemaType<typeof notificationSchema>;

export const Notification = model(
  "Notification",
  notificationSchema
);