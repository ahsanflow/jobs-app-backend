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
    error: process.env.NODE_ENV === "development" ? error : undefined,
  };
  res.status(statusCode).json(response);
};
