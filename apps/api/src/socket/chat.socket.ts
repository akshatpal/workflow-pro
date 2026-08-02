import { Server, Socket } from "socket.io";

export const registerChatSocket = (
  io: Server,
  socket: Socket
) => {
  socket.on(
    "chat:join",
    (conversationId: string) => {
      socket.join(conversationId);
    }
  );

  socket.on(
    "chat:leave",
    (conversationId: string) => {
      socket.leave(conversationId);
    }
  );

  socket.on(
    "chat:typing",
    (data) => {
      socket
        .to(data.conversationId)
        .emit("chat:typing", {
          userId: data.userId,
        });
    }
  );

  socket.on(
    "chat:stopTyping",
    (data) => {
      socket
        .to(data.conversationId)
        .emit(
          "chat:stopTyping",
          {
            userId: data.userId,
          }
        );
    });

  socket.on(
    "chat:message",
    (data) => {
      io.to(data.conversationId).emit(
        "chat:message",
        data
      );
    });

  socket.on(
    "chat:read",
    (data) => {
      io.to(data.conversationId).emit(
        "chat:read",
        data
      );
    });
};