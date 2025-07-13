import { Request, Response, Router, NextFunction } from "express";
import { getMultisigsByUser } from "../../domain/multisig/services/getMultisigsByUser";
import { createMultisig } from "../../domain/multisig/services/createMultisig";
import { Address } from "../../types";
import {
  CreateMultisigSchema,
  GetMultisigsSchema,
} from "../validators/multisigs";

const router = Router();

/**
 * GET /multisigs
 *
 * Query Parameters:
 * - wallet: string (required) - Wallet address of the user
 *
 * Returns:
 * - 200: List of multisigs created by the specified wallet
 * - 400: If wallet query param is missing or invalid
 * - 500: On internal server error
 */
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

/**
 * POST /multisigs
 *
 * Request Body:
 * - name: string - Name of the multisig wallet
 * - chainId: number - Chain/network ID where the wallet is deployed
 * - creatorWallet: string - Address of the wallet creating the multisig
 * - signers: string[] - List of signer addresses
 * - threshold: number - Number of required signers to execute transactions
 * - contractAddr: string - Deployed multisig contract address
 *
 * Returns:
 * - 201: Multisig wallet successfully created
 * - 400: Validation failed (e.g. missing fields, invalid address format)
 * - 500: On internal server error
 */
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
