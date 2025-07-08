import { useReadContract, useWriteContract } from "wagmi";
import { MULTISIG_ADDRESS } from "../contracts/multisig";
import {
  ArgsFor,
  MultisigReadFn,
  MultisigWriteFn,
  MULTISIG_TYPED_ABI,
} from "../contracts/multisig.types";

export function useReadMultisigContract({
  functionName,
  args,
}: {
  functionName: MultisigReadFn;
  args?: unknown[];
}) {
  return useReadContract({
    abi: MULTISIG_TYPED_ABI,
    address: MULTISIG_ADDRESS,
    functionName,
    args,
  });
}

export function useWriteMultisigContract<
  TFunctionName extends MultisigWriteFn
>() {
  const { writeContractAsync } = useWriteContract();

  return (functionName: TFunctionName, args: ArgsFor<TFunctionName>) => {
    return writeContractAsync({
      abi: MULTISIG_TYPED_ABI,
      address: MULTISIG_ADDRESS,
      functionName,
      args,
    });
  };
}
