import { Schema, model, InferSchemaType } from "mongoose";

const columnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },

    position: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      default: "#4F46E5",
    },

    wipLimit: {
      type: Number,
      default: 0,
    },

    isCollapsed: {
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

export type ColumnDocument = InferSchemaType<typeof columnSchema>;

export const Column = model("Column", columnSchema);