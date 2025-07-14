import { useReadContract, useReadContracts, useWriteContract } from "wagmi";
import { MULTISIG_ADDRESS } from "../contracts/multisig";
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
