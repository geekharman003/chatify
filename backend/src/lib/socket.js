import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socketAuthMiddleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// stores online users
const userSocketMap = {}; //{userId:socketId}

// io.on is used to listen events for all sockets
io.on("connection", (socket) => {
  console.log("A user is connected:", socket.user.fullName);
  const userId = socket.user._id;

  userSocketMap[userId] = socket.id;

  //   io.emit is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //   socket.on is used to listen events
  socket.on("disconnect", () => {
    console.log("user gets disconnected:", socket.user.fullName);
    delete userSocketMap[socket.user._id];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
