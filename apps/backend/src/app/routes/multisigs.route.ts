import { Request, Response, Router, NextFunction } from "express";
import { getMultisigsByUser } from "../../domain/multisig/services/getMultisigsByUser";
import { createMultisig } from "../../domain/multisig/services/createMultisig";
import { Address } from "../../types";
import {
  CreateMultisigSchema,
  GetMultisigsSchema,
} from "../validators/multisigs";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const parsedParams = GetMultisigsSchema.safeParse(req.query);
  if (!parsedParams.success || !parsedParams.data) {
    next(parsedParams.error);
    return;
  }
  try {
    const { wallet } = parsedParams.data;

    const multisigs = await getMultisigsByUser(wallet as Address);
    res.status(200).json(multisigs);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const parsedParams = CreateMultisigSchema.safeParse(req.body);
  if (!parsedParams.success || !parsedParams.data) {
    next(parsedParams.error);
    return;
  }
  try {
    const { name, chainId, creatorWallet, signers, threshold, contractAddr } =
      parsedParams.data;

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
