import { parseEther } from "viem";
import { sendTransaction } from "@wagmi/core";
import { config } from "@/wagmiConfig";
import { MULTISIG_ADDRESS } from "@/lib/contracts/multisig";

interface SendFundsParams {
  address: `0x${string}`;
  value: number;
}

export async function sendFundsToContract({
  address,
  value,
}: SendFundsParams): Promise<
  { success: true; hash: `0x${string}` } | { success: false; error: string }
> {
  try {
    const tx = await sendTransaction(config, {
      to: MULTISIG_ADDRESS,
      account: address,
      value: parseEther(value.toString()),
    });

    return { success: true, hash: tx };
  } catch (error: any) {
    return {
      success: false,
      error: error?.shortMessage || error?.message || "Unknown error",
    };
  }
}
