import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // take token from cookie
    const token = socket.handshake.headers.cookie.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: no token provided");
      next(new Error("Unauthorized - No Token provided"));
      return;
    }

    //  verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: invalid token");
      return next(new Error("Unauthorized: Token is invalid or Expired"));
    }

    //  find user in DB
    const user = await User.findById({ _id: decoded.userId }).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    //  attach user to socket
    socket.user = user;
    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized: Authentication failed"));
  }
};
