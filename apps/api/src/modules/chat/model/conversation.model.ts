import { Schema, model, InferSchemaType } from "mongoose";

export enum ConversationType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
  PROJECT = "PROJECT",
}

const memberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },

    lastReadMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  {
    _id: false,
  }
);

const conversationSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: Object.values(ConversationType),
      required: true,
    },

    members: {
      type: [memberSchema],
      default: [],
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
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

export type ConversationDocument =
  InferSchemaType<typeof conversationSchema>;

export const Conversation = model(
  "Conversation",
  conversationSchema
);