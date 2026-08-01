import { Schema, model, InferSchemaType } from "mongoose";

const commentSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    edited: {
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

export type CommentDocument =
  InferSchemaType<typeof commentSchema>;

export const Comment = model(
  "Comment",
  commentSchema
);