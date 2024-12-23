import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, PORT, FRONTEND_URL, DB_URL, JWT_SECRET } = process.env;

export { NODE_ENV, PORT, FRONTEND_URL, DB_URL, JWT_SECRET };
