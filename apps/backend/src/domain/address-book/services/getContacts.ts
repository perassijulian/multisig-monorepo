import { prisma } from "../../../infra/db/client";
import { Address } from "../../../types";

export async function getContacts(wallet: Address) {
  return prisma.addressBookEntry.findMany({
    where: { creator: { wallet } },
  });
}
