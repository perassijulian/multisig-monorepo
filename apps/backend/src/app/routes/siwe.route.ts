import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get(
  "/nonce",
  async (req: Request, res: Response, next: NextFunction) => {}
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {}
);

router.get(
  "/me",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default router;
