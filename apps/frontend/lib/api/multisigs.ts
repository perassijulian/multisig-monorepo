import { CreateMultisigPayload } from "@/types";

export async function postMultisigToAPI(data: CreateMultisigPayload) {
  try {
    const res = await fetch("http://localhost:4000/api/multisigs", {
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
      `http://localhost:4000/api/multisigs?wallet=${encodeURIComponent(
        wallet
      )}`,
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
