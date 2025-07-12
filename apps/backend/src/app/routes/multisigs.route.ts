import { Request, Response, Router, NextFunction } from "express";
import { getMultisigsByUser } from "../../domain/multisig/services/getMultisigsByUser";

// TODO add zod
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { wallet } = req.query;

    if (!wallet || typeof wallet !== "string") {
      return res.status(400).json({ error: "Missing wallet address" });
    }

    const multisigs = await getMultisigsByUser(wallet);
    res.status(200).json(multisigs);
  } catch (error) {
    next(error);
  }
});

export default router;
