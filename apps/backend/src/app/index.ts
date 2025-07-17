import express, { Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

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
app.use(
  session({
    name: "siwe-session",
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Routes
app.use("/api", routes);

// Health check
app.get("/status", (_: Request, res: Response) => {
  res.send({ ok: true });
});

// centralized error handler (always last)
app.use(errorHandler);

export { app };
