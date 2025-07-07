import { useReadContract, useWriteContract } from "wagmi";
import { MULTISIG_ADDRESS, MULTISIG_ABI } from "../contracts/multisig";
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
  });
}

export function useWriteMultisigContract<
  TFunctionName extends MultisigWriteFn
>({
  functionName,
  args,
}: {
  functionName: TFunctionName;
  args: ArgsFor<TFunctionName>;
}) {
  const { writeContract } = useWriteContract();
  return writeContract({
    abi: MULTISIG_TYPED_ABI,
    address: MULTISIG_ADDRESS,
    functionName,
    args,
  });
}
