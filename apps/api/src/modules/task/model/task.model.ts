import { Schema, model, InferSchemaType } from "mongoose";

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    taskNo: {
      type: String,
      required: true,
      unique: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },

    column: {
      type: Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },

    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },

    storyPoints: {
      type: Number,
      default: 0,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label",
      },
    ],

    position: {
      type: Number,
      default: 0,
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

export type TaskDocument = InferSchemaType<typeof taskSchema>;

export const Task = model("Task", taskSchema);