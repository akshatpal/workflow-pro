import http from "http";

import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

import { initSocket } from "./socket/socket.js";

const startServer = async () => {
  await connectDatabase();

  const server = http.createServer(app);

  initSocket(server);

  server.listen(env.PORT, () => {
    console.log(
      `Server running on ${env.PORT}`
    );
  });
};

startServer();