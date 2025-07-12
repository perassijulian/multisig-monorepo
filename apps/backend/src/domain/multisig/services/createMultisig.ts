import { prisma } from "../../../infra/db/client";
import { Address } from "../../../types";

export async function createMultisig({
  name,
  chainId,
  creatorWallet,
  signers,
  threshold,
  contractAddr,
}: {
  name: string;
  chainId: number;
  creatorWallet: Address;
  signers: Address[];
  threshold: number;
  contractAddr: Address;
}) {
  // Find or create the creator user
  const creator = await prisma.user.upsert({
    where: { wallet: creatorWallet },
    update: {},
    create: { wallet: creatorWallet },
  });

  // Create the multisig and attach signers
  const multisig = await prisma.multisig.create({
    data: {
      name,
      chainId,
      threshold,
      creatorId: creator.id,
      signers: {
        create: signers.map((address) => ({ address })),
      },
      contractAddr,
    },
    include: { signers: true },
  });

  return multisig;
}
