import { prisma } from "../../../infra/db/client";
import { Address } from "../../../types";

export async function getMultisigsByUser(wallet: Address) {
  return prisma.multisig.findMany({
    where: { creator: { wallet } },
    include: { signers: true },
  });
}
