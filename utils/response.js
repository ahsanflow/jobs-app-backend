export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = {},
  error = null
) => {
  const response = {
    success,
    statusCode,
    message,
    data,
    error: process.env.NODE_ENV === "development" ? error : undefined,
  };
  res.status(statusCode).json(response);
};
