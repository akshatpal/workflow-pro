import { io, Socket } from "socket.io-client";

// Strip the /api suffix if present — socket.io runs at the server root
const SOCKET_URL = (
  import.meta.env.VITE_API_URL as string
).replace(/\/api\/?$/, "");

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
    });
  }

  return socket;
};

export const connectSocket = (userId: string) => {
  const s = getSocket();

  if (!s.connected) {
    s.connect();
  }

  // Join the user's personal room so the server can push targeted events
  s.emit("join", userId);
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};
