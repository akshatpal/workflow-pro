import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  (import.meta.env.VITE_SOCKET_URL as string) ||
  ((import.meta.env.VITE_API_URL as string) || "http://localhost:5000").replace(
    /\/api.*$/,
    ""
  );

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
    });
  }

  return socket;
};

export const connectSocket = (userId: string) => {
  const s = getSocket();

  if (!s.connected) {
    s.connect();
  }

  s.emit("join", userId);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

