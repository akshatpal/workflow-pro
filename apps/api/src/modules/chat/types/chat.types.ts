import { ConversationType } from "../model/conversation.model.js";

export interface CreateConversationInput {
  name?: string;

  avatar?: string;

  type: ConversationType;

  members: string[];

  project?: string;
}

export interface SendMessageInput {
  conversation: string;

  sender: string;

  message: string;

  attachments?: string[];
}

export interface UpdateMessageInput {
  message: string;
}