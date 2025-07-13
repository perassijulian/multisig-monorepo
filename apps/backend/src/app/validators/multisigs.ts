import { z } from "zod";
import { Address } from "../../types";

const zAddress = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/) as unknown as z.ZodType<Address>;

export const GetMultisigsSchema = z.object({
  wallet: zAddress,
});

export const CreateMultisigSchema = z.object({
  name: z.string().min(3),
  chainId: z.number().int(),
  creatorWallet: zAddress,
  signers: z.array(zAddress),
  threshold: z.number().int().positive(),
  contractAddr: zAddress,
});
