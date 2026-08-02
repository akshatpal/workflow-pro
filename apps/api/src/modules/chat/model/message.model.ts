import { Schema, model, InferSchemaType } from "mongoose";

const reactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    emoji: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
      },
    ],

    reactions: {
      type: [reactionSchema],
      default: [],
    },

    edited: {
      type: Boolean,
      default: false,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type MessageDocument =
  InferSchemaType<typeof messageSchema>;

export const Message = model(
  "Message",
  messageSchema
);