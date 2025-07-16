import { z } from "zod";
import { Address } from "../../types";

const zAddress = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/) as unknown as z.ZodType<Address>;

export const GetAddressBookSchema = z.object({
  wallet: zAddress,
});

export const CreateNewContactSchema = z.object({
  name: z.string().min(3),
  creator: zAddress,
  address: zAddress,
});
