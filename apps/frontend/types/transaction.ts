// Transaction shape as stored on-chain (includes confirmations & executed flag)
export interface Transaction {
  to: string;
  value: bigint; // or string
  data: string;
  executed: boolean;
  numConfirmations: number;
}

// What the user submits from the form
export interface TransactionFormValues {
  to: string;
  value: string; // input is string for controlled form elements
  data: string;
}
