import { Request, Response, Router, NextFunction } from "express";
import { getMultisigsByUser } from "../../domain/multisig/services/getMultisigsByUser";
import { createMultisig } from "../../domain/multisig/services/createMultisig";
import { Address } from "../../types";

// TODO add zod
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { wallet } = req.query;

    if (!wallet || typeof wallet !== "string") {
      return res.status(400).json({ error: "Missing wallet address" });
    }

    const multisigs = await getMultisigsByUser(wallet as Address);
    res.status(200).json(multisigs);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, chainId, creatorWallet, signers, threshold, contractAddr } =
      req.body;

    if (
      !name ||
      !chainId ||
      !creatorWallet ||
      !contractAddr ||
      !Array.isArray(signers) ||
      typeof threshold !== "number"
    ) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const multisig = await createMultisig({
      name,
      chainId,
      creatorWallet,
      signers,
      threshold,
      contractAddr,
    });

    res.status(201).json(multisig);
  } catch (err) {
    next(err);
  }
});

export default router;
