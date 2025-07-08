import {
  Abi,
  ExtractAbiFunctionNames,
  ExtractAbiFunction,
  AbiParametersToPrimitiveTypes,
} from "abitype";
import { MULTISIG_ABI } from "./multisig";

// Enforce ABI is valid
export const MULTISIG_TYPED_ABI =
  MULTISIG_ABI as typeof MULTISIG_ABI satisfies Abi;

// Derive helper types
export type MultisigReadFn = ExtractAbiFunctionNames<
  typeof MULTISIG_TYPED_ABI,
  "view" | "pure"
>;
export type MultisigWriteFn = ExtractAbiFunctionNames<
  typeof MULTISIG_TYPED_ABI,
  "nonpayable" | "payable"
>;

// Given a function name, get the argument types
export type ArgsForWrite<TName extends MultisigWriteFn> =
  AbiParametersToPrimitiveTypes<
    ExtractAbiFunction<typeof MULTISIG_TYPED_ABI, TName>["inputs"]
  >;

export type ArgsForRead<TName extends MultisigReadFn> =
  AbiParametersToPrimitiveTypes<
    ExtractAbiFunction<typeof MULTISIG_TYPED_ABI, TName>["inputs"]
  >;
