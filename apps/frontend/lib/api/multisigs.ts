import { FormDataType } from "@/app/new-wallet/create/CreateWalletForm";

type ExtendedProps = FormDataType & {
  contractAddr: string;
  creatorWallet: string;
};

export async function postMultisigToAPI(data: ExtendedProps) {
  try {
    const res = await fetch("http://localhost:4000/multisigs", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to create multisig");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
