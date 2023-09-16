require("dotenv").config();

const env = process.env;

const PORT = env.PORT ?? "8084";
const HOST = env.HOST ?? "127.0.0.1";
const SERVER_URL = `http://${HOST}:${PORT}`;

const origin =
  env.NODE_ENV === "production"
    ? env.REMOTE_APP_URL
    : SERVER_URL;

export const MONGODB_URI =
  env.MONGODB_URI ?? "mongodb://localhost:27017";
export const DATABASE_NAME = env.DATABASE_NAME ?? "local";

export default {
  PORT,
  HOST,
  SERVER_URL,
  origin
};
