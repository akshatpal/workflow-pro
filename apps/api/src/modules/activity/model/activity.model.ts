import { Schema, model, InferSchemaType } from "mongoose";

export enum ActivityType {
  TASK_CREATED = "TASK_CREATED",
  TASK_UPDATED = "TASK_UPDATED",
  TASK_MOVED = "TASK_MOVED",
  TASK_DELETED = "TASK_DELETED",

  COMMENT_CREATED = "COMMENT_CREATED",
  COMMENT_UPDATED = "COMMENT_UPDATED",
  COMMENT_DELETED = "COMMENT_DELETED",
}

const activitySchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(ActivityType),
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type ActivityDocument =
  InferSchemaType<typeof activitySchema>;

export const Activity = model(
  "Activity",
  activitySchema
);