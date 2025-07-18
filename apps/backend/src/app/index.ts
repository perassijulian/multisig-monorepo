import express, { Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { sessionMiddleware } from "../infra/session/redisStore";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// SIWE-session
app.use(sessionMiddleware);

app.use((req, res, next) => {
  console.log("SESSION ID:", req.sessionID);
  console.log("SESSION OBJECT:", req.session);
  next();
});

// Routes
app.use("/api", routes);

// Health check
app.get("/status", (_: Request, res: Response) => {
  res.send({ ok: true });
});

// centralized error handler (always last)
app.use(errorHandler);

export { app };
