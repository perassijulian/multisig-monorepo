import session from "express-session";
import { RedisStore } from "connect-redis";
import redisClient from "../cache/redis";

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "multisig:",
});

export const sessionMiddleware = session({
  name: "siwe-session",
  store: redisStore,
  secret: process.env.SESSION_SECRET || "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // set true in production (HTTPS)
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
});
