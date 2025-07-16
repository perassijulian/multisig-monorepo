import { CreateContactFormValues } from "@/types";

export async function postContactToAPI(data: CreateContactFormValues) {
  try {
    const res = await fetch("http://localhost:4000/address-book", {
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

export async function getContactsFromAPI({
  wallet,
}: {
  wallet: `0x${string}`;
}) {
  try {
    const res = await fetch(
      `http://localhost:4000/address-book?wallet=${encodeURIComponent(wallet)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) throw new Error("Failed to get contacts");

    return res.json();
  } catch (error) {
    console.error(error);
  }
}
