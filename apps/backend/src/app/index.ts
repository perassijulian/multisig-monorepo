import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/", routes);
app.use("/api", routes);

// Health check
app.get("/status", (_: Request, res: Response) => {
  res.send({ ok: true });
});

export { app };
