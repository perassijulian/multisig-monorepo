import { prisma } from "../../../infra/db/client";

export async function getMultisigsByUser(wallet: string) {
  return prisma.multisig.findMany({
    where: { creator: { wallet } },
    include: { signers: true },
  });
}
