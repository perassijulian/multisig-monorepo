import { useReadContract, useReadContracts, useWriteContract } from "wagmi";
import {
  ArgsForWrite,
  ArgsForRead,
  MultisigReadFn,
  MultisigWriteFn,
  MULTISIG_TYPED_ABI,
} from "../contracts/multisig.types";
import { Abi } from "abitype";
import { useMemo } from "react";
import { useMultisigStore } from "@/stores/multisigStore";

/**
 * Hook to read data from the currently selected Multisig contract.
 *
 * @template T - A valid read function name from the Multisig ABI.
 * @param {Object} params
 * @param {T} params.functionName - The name of the read function to call.
 * @param {ArgsForRead<T>} [params.args] - Optional arguments for the function.
 *
 * @returns {ReturnType<typeof useReadContract>} Wagmi read query result.
 *
 * @example
 * const { data, isLoading } = useReadMultisigContract({
 *   functionName: "getOwners"
 * });
 */
export function useReadMultisigContract<TFunctionName extends MultisigReadFn>({
  functionName,
  args,
}: {
  functionName: TFunctionName;
  args?: ArgsForRead<TFunctionName>;
}) {
  const multisigAddress = useMultisigStore((state) => state.address);

  return useReadContract({
    abi: MULTISIG_TYPED_ABI as Abi,
    address: multisigAddress as `0x${string}` | undefined,
    functionName,
    args,
  });
}

/**
 * Hook to write to the currently selected Multisig contract.
 *
 * Will throw an error if the Multisig address is not set.
 * Wraps `writeContractAsync` with ABI, address, and types preconfigured.
 *
 * @template T - A valid write function name from the Multisig ABI.
 *
 * @returns {(fn: T, args: ArgsForWrite<T>) => Promise<ReturnType<typeof writeContractAsync>>}
 * Async write function for the Multisig contract.
 *
 * @example
 * const write = useWriteMultisigContract();
 *
 * await write("submitTransaction", [
 *   "0xRecipientAddress",
 *   BigInt(1000),
 *   "0x"
 * ]);
 */
export function useWriteMultisigContract<T extends MultisigWriteFn>() {
  const { writeContractAsync } = useWriteContract();
  const multisigAddress = useMultisigStore((state) => state.address);

  const write = async (fn: T, args: ArgsForWrite<T>) => {
    if (!multisigAddress) {
      throw new Error("No multisig address set");
    }

    return writeContractAsync({
      abi: MULTISIG_TYPED_ABI as Abi,
      address: multisigAddress as `0x${string}`,
      functionName: fn,
      args,
    });
  };

  return write;
}

/**
 * Hook to fetch all transactions from the current Multisig contract.
 *
 * Uses a batched `useReadContracts` call with `getTransaction(i)` for each index.
 *
 * @param {number} transactionCount - Total number of transactions to fetch.
 * @returns {ReturnType<typeof useReadContracts>} Wagmi multicall query result.
 *
 * @example
 * const { data, isLoading } = useMultisigTransactions(5);
 *
 * data?.[0]?.result?.to; // Access the first transaction's 'to' field
 */
export function useMultisigTransactions(transactionCount: number) {
  const multisigAddress = useMultisigStore((state) => state.address);

  const contracts = useMemo(() => {
    if (!multisigAddress) return [];

    return Array.from({ length: transactionCount }, (_, i) => ({
      address: multisigAddress as `0x${string}`,
      abi: MULTISIG_TYPED_ABI,
      functionName: "getTransaction",
      args: [BigInt(i)],
    }));
  }, [transactionCount]);

  return useReadContracts({ contracts });
}
