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

export function useReadMultisigContract<TFunctionName extends MultisigReadFn>({
  functionName,
  args,
}: {
  functionName: TFunctionName;
  args?: ArgsForRead<TFunctionName>;
}) {
  return useReadContract({
    abi: MULTISIG_TYPED_ABI as Abi,
    address: MULTISIG_ADDRESS,
    functionName,
    args,
  });
}

export function useWriteMultisigContract<
  TFunctionName extends MultisigWriteFn
>() {
  const { writeContractAsync } = useWriteContract();

  return (functionName: TFunctionName, args: ArgsForWrite<TFunctionName>) => {
    return writeContractAsync({
      abi: MULTISIG_TYPED_ABI as Abi,
      address: MULTISIG_ADDRESS,
      functionName,
      args,
    });
  };
}

export function useMultisigTransactions(transactionCount: number) {
  const contracts = useMemo(() => {
    return Array.from({ length: transactionCount }, (_, i) => ({
      address: MULTISIG_ADDRESS as `0x${string}`,
      abi: MULTISIG_TYPED_ABI,
      functionName: "getTransaction",
      args: [BigInt(i)],
    }));
  }, [transactionCount]);

  return useReadContracts({ contracts });
}
