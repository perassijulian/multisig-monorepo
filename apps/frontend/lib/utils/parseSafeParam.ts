import { z } from "zod";
export const SafeParamSchema = z
  .string()
  .regex(/^([a-zA-Z0-9]+):0x[a-fA-F0-9]{40}$/)
  .transform((val) => {
    const [chain, address] = val.split(":");
    return { chain, address: address as `0x${string}` };
  });

export type SafeParam = z.infer<typeof SafeParamSchema>;

export function parseSafeParam(input: string | null): SafeParam | null {
  try {
    if (!input) return null;
    return SafeParamSchema.parse(input);
  } catch {
    return null;
  }
}
