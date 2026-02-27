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

export const getReciverSocketId = (userId) => {
  return userSocketMap.get(userId);
};

// stores online users
const userSocketMap = new Map(); //{userId: set<socketId>}

// io.on is used to listen events for all sockets
io.on("connection", async (socket) => {
  console.log("A user is connected:", socket.user.fullName);
  const userId = socket.user._id.toString();

  if (userSocketMap.has(userId)) {
    const setOfSocketIds = userSocketMap.get(userId);
    setOfSocketIds.add(socket.id);

    userSocketMap.set(userId, setOfSocketIds);
  } else {
    const setOfSocketIds = new Set();
    setOfSocketIds.add(socket.id);

    userSocketMap.set(userId, setOfSocketIds);
  }

  //   io.emit is used to send events to all connected clients
   io.emit("getOnlineUsers", [...userSocketMap.keys()]);

  //   socket.on is used to listen events
  socket.on("disconnect", () => {
    console.log("user gets disconnected:", socket.user.fullName);

    const userId = socket.user._id.toString();
    const setOfSocketIds = userSocketMap.get(userId);
    setOfSocketIds.delete(socket.id);

    if (setOfSocketIds.size === 0) {
      userSocketMap.delete(userId);
    } else {
      userSocketMap.set(userId, setOfSocketIds);
    }

    io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  });
});

export { io, app, server };
