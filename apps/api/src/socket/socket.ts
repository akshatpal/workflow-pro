import { Server } from "socket.io";
import { registerChatSocket } from "./chat.socket.js";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://workflow-pro-web.vercel.app"
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket Connected ${socket.id}`);

    socket.on("join", (userId: string) => {
      socket.join(userId);
    });

    registerChatSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(`Disconnected ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => io;