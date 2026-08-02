import { HydratedDocument } from "mongoose";

import { ConversationDocument } from "../model/conversation.model.js";
import { MessageDocument } from "../model/message.model.js";

export class ChatDto {
  static conversation(
    conversation: HydratedDocument<ConversationDocument>
  ) {
    return {
      id: conversation._id.toString(),

      name: conversation.name,

      avatar: conversation.avatar,

      type: conversation.type,

      members: conversation.members,

      project: conversation.project,

      lastMessage: conversation.lastMessage,

      createdAt: conversation.createdAt,
    };
  }

  static message(
    message: HydratedDocument<MessageDocument>
  ) {
    return {
      id: message._id.toString(),

      conversation: message.conversation,

      sender: message.sender,

      message: message.message,

      attachments: message.attachments,

      reactions: message.reactions,

      edited: message.edited,

      createdAt: message.createdAt,
    };
  }

  static messages(
    messages: HydratedDocument<MessageDocument>[]
  ) {
    return messages.map((message) =>
      this.message(message)
    );
  }
}