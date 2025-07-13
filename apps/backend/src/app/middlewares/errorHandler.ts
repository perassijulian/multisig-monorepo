import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    console.error(err);
    return res.status(400).json({ error: "Validation failed" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
