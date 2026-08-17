import type { Socket } from "socket.io-client";

import type {
  Message,
} from "./chat.types";

export interface ChatTypingEvent {
  conversationId: string;
  userId: string;
}

export interface ChatReadEvent {
  conversationId: string;
  userId: string;
  messageId: string;
}

export interface ChatSocketHandlers {
  onMessage?: (
    message: Message
  ) => void;

  onTyping?: (
    data: ChatTypingEvent
  ) => void;

  onStopTyping?: (
    data: ChatTypingEvent
  ) => void;

  onRead?: (
    data: ChatReadEvent
  ) => void;
}

export const joinConversation = (
  socket: Socket,
  conversationId: string
) => {
  socket.emit(
    "chat:join",
    conversationId
  );
};

export const leaveConversation = (
  socket: Socket,
  conversationId: string
) => {
  socket.emit(
    "chat:leave",
    conversationId
  );
};

export const startTyping = (
  socket: Socket,
  conversationId: string,
  userId: string
) => {
  socket.emit(
    "chat:typing",
    {
      conversationId,
      userId,
    }
  );
};

export const stopTyping = (
  socket: Socket,
  conversationId: string,
  userId: string
) => {
  socket.emit(
    "chat:stopTyping",
    {
      conversationId,
      userId,
    }
  );
};

export const sendSocketMessage = (
  socket: Socket,
  conversationId: string,
  message: Message
) => {
  socket.emit(
    "chat:message",
    {
      conversationId,
      message,
    }
  );
};

export const markMessageAsRead = (
  socket: Socket,
  conversationId: string,
  userId: string,
  messageId: string
) => {
  socket.emit(
    "chat:read",
    {
      conversationId,
      userId,
      messageId,
    }
  );
};