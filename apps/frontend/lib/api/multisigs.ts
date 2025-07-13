import { FormDataType } from "@/app/new-wallet/create/CreateWalletForm";

//TODO create proper type
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

export async function getMultisigToAPI({ wallet }: { wallet: `0x${string}` }) {
  try {
    const res = await fetch(
      `http://localhost:4000/multisigs?wallet=${encodeURIComponent(wallet)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) throw new Error("Failed to get multisigs");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
