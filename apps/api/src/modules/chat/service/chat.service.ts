import { HydratedDocument } from "mongoose";
import { Conversation, ConversationDocument } from "../model/conversation.model.js";
import { Message, MessageDocument } from "../model/message.model.js";

import { UserModel } from "../../user/model/user.model.js";
import { Project } from "../../project/model/project.model.js";

import { ChatDto } from "../dto/chat.dto.js";

import {
  CreateConversationInput,
  SendMessageInput,
  UpdateMessageInput,
} from "../types/chat.types.js";

import { NotFoundError } from "../../../common/errors/NotFoundError.js";

export class ChatService {
  static async createConversation(
    payload: CreateConversationInput
  ) {
    for (const member of payload.members) {
      const exists =
        await UserModel.findById(member);

      if (!exists) {
        throw new NotFoundError(
          "User not found"
        );
      }
    }

    if (payload.project) {
      const project =
        await Project.findById(
          payload.project
        );

      if (!project) {
        throw new NotFoundError(
          "Project not found"
        );
      }
    }

    const conversation =
      await Conversation.create({
        name: payload.name,

        avatar: payload.avatar,

        type: payload.type,

        project: payload.project,

        members: payload.members.map(
          (user) => ({
            user,
          })
        ),
      });

    return ChatDto.conversation(
      conversation as unknown as HydratedDocument<ConversationDocument>
    );
  }

  static async getConversations(
    userId: string
  ) {
    const conversations =
      await Conversation.find({
        "members.user": userId,

        isDeleted: false,
      })
        .populate(
          "members.user",
          "name email profilePic"
        )
        .populate("lastMessage")
        .sort({
          updatedAt: -1,
        });

    return conversations.map((c) =>
      ChatDto.conversation(c as unknown as HydratedDocument<ConversationDocument>)
    );
  }

  static async getMessages(
    conversationId: string
  ) {
    const conversation =
      await Conversation.findById(
        conversationId
      );

    if (!conversation) {
      throw new NotFoundError(
        "Conversation not found"
      );
    }

    const messages =
      await Message.find({
        conversation: conversationId,

        deleted: false,
      })
        .populate(
          "sender",
          "name email profilePic"
        )
        .populate("attachments")
        .sort({
          createdAt: 1,
        });

    return ChatDto.messages(messages as unknown as HydratedDocument<MessageDocument>[]);
  }

  static async sendMessage(
    payload: SendMessageInput
  ) {
    const conversation =
      await Conversation.findById(
        payload.conversation
      );

    if (!conversation) {
      throw new NotFoundError(
        "Conversation not found"
      );
    }

    const message =
      await Message.create({
        conversation:
          payload.conversation,

        sender: payload.sender,

        message: payload.message,

        attachments:
          payload.attachments ??
          [],
      });

    conversation.lastMessage =
      message._id;

    await conversation.save();

    const result =
      await Message.findById(message._id)
        .populate(
          "sender",
          "name email profilePic"
        )
        .populate("attachments");

    return ChatDto.message(result as unknown as HydratedDocument<MessageDocument>);
  }

  static async updateMessage(
    id: string,
    payload: UpdateMessageInput
  ) {
    const message =
      await Message.findById(id);

    if (!message) {
      throw new NotFoundError(
        "Message not found"
      );
    }

    message.message =
      payload.message;

    message.edited = true;

    await message.save();

    return ChatDto.message(message as unknown as HydratedDocument<MessageDocument>);
  }

  static async deleteMessage(
    id: string
  ) {
    const message =
      await Message.findById(id);

    if (!message) {
      throw new NotFoundError(
        "Message not found"
      );
    }

    message.deleted = true;

    await message.save();

    return {
      message:
        "Message deleted successfully",
    };
  }

  static async addReaction(
    messageId: string,
    userId: string,
    emoji: string
  ) {
    const message =
      await Message.findById(
        messageId
      );

    if (!message) {
      throw new NotFoundError(
        "Message not found"
      );
    }

    const existing =
      message.reactions.find(
        (reaction) =>
          reaction.user.toString() ===
            userId &&
          reaction.emoji === emoji
      );

    if (!existing) {
      message.reactions.push({
        user: userId as any,
        emoji,
      });
    }

    await message.save();

    return ChatDto.message(message as unknown as HydratedDocument<MessageDocument>);
  }

  static async removeReaction(
    messageId: string,
    userId: string,
    emoji: string
  ) {
    const message =
      await Message.findById(
        messageId
      );

    if (!message) {
      throw new NotFoundError(
        "Message not found"
      );
    }

    message.reactions =
      message.reactions.filter(
        (reaction) =>
          !(
            reaction.user.toString() ===
              userId &&
            reaction.emoji === emoji
          )
      ) as typeof message.reactions;

    await message.save();

    return ChatDto.message(message as unknown as HydratedDocument<MessageDocument>);
  }
}