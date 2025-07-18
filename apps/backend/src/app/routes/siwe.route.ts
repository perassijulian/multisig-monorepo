import { NextFunction, Request, Response, Router } from "express";
import {
  createSiweNonce,
  verifySiweLogin,
} from "../../domain/auth/services/siwe.service";

const router = Router();

/**
 * GET /auth/nonce
 *
 * Description:
 * - Generates a new SIWE nonce and stores it in the session for later verification.
 *
 * Returns:
 * - 200: A plaintext nonce string (used in SIWE message signing)
 * - 500: On internal server error
 */
router.get(
  "/nonce",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nonce = createSiweNonce(req);
      return res.type("text/plain").status(200).send(nonce);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /auth/login
 *
 * Request Body:
 * - message: string - The signed SIWE message
 * - signature: string - The cryptographic signature of the message
 *
 * Description:
 * - Verifies the SIWE login using the provided message and signature.
 * - If valid, stores the verified SIWE message in the session and sets cookie expiration (if applicable).
 *
 * Returns:
 * - 200: Login successful
 * - 400: Missing message or signature
 * - 401: Invalid signature or nonce mismatch
 * - 500: On internal server error
 */

//TODO add req.body verification
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await verifySiweLogin(req);
      await new Promise((resolve) => req.session.save(resolve));
      return res.status(200).send(true);
    } catch (err) {
      req.session.siwe = undefined;
      req.session.nonce = undefined;
      next(err);
    }
  }
);

/**
 * GET /auth/me
 *
 * Description:
 * - Returns the authenticated user's Ethereum address if logged in via SIWE.
 *
 * Returns:
 * - 200: Authenticated. Returns a plaintext message with the wallet address
 * - 401: Not authenticated. SIWE session not found
 * - 500: On internal server error
 */
router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const siwe = req.session.siwe;
    if (!siwe) {
      return res.status(401).json({ message: "You must sign in first." });
    }

    const { address, chainId } = siwe;
    console.log("User is authenticated: ", address, " on chain ", chainId);

    res.status(200).json({ address, chainId, isAuthenticated: true });
  } catch (err) {
    next(err);
  }
});

export default router;
