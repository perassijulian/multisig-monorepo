import { NextFunction, Request, Response, Router } from "express";
import {
  createSiweNonce,
  verifySiweLogin,
} from "../../domain/auth/services/siwe.service";

const router = Router();

router.get(
  "/nonce",
  async (req: Request, res: Response, next: NextFunction) => {
    const nonce = createSiweNonce(req);
    return res.type("text/plain").status(200).send(nonce);
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verifySiweLogin(req);
      req.session.save(() => res.status(200).send(true));
    } catch (err) {
      req.session.siwe = undefined;
      req.session.nonce = undefined;
      next(err);
    }
  }
);

router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const siwe = req.session.siwe;

    if (!siwe) {
      return res.status(401).json({ message: "You must sign in first." });
    }

    console.log("User is authenticated: ", siwe.address);

    res
      .type("text/plain")
      .status(200)
      .send(`You are authenticated. Wallet address: ${siwe.address}`);
  } catch (err) {
    next(err);
  }
});

export default router;
