import { NODE_ENV } from "../config/index.js";

export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = {},
  metadata = {},
  error = null
) => {
  const response = {
    success,
    statusCode,
    message,
    data,
    metadata,
    error: NODE_ENV === "development" ? error : undefined,
  };
  res.status(statusCode).json(response);
};
