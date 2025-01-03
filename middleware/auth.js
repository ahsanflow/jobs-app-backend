import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.js";
import { JWT_SECRET } from "../config/index.js";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // authoriztion header
  // const token = req.cookies?.token; // cookie
  if (!token) {
    return sendResponse(
      res,
      401,
      false,
      "Access denied. No token provided.",
      {},
      {},
      "Access denied."
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (error) {
    sendResponse(res, 401, false, "Invalid token");
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendResponse(
        res,
        403,
        false,
        "Access denied. Insufficient permissions."
      );
    }
    next();
  };
};
