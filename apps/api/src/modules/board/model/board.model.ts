import { Schema, model, InferSchemaType } from "mongoose";

export enum BoardType {
  KANBAN = "KANBAN",
  SCRUM = "SCRUM",
}

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: Object.values(BoardType),
      default: BoardType.KANBAN,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    position: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export type BoardDocument = InferSchemaType<typeof boardSchema>;

export const Board = model("Board", boardSchema);