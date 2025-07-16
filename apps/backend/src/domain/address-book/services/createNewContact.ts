import { prisma } from "../../../infra/db/client";
import { Address } from "../../../types";

export async function createNewContact({
  name,
  creator,
  address,
}: {
  name: string;
  creator: Address;
  address: Address;
}) {
  // Find the creator user
  const user = await prisma.user.findUnique({
    where: { wallet: creator },
  });

  // TODO create a class and handle errors gracefully
  // Check creator exists
  if (!user) {
    throw new Error("Creator user not found on the database");
  }

  // Check contact is not registered already
  const existing = await prisma.addressBookEntry.findFirst({
    where: { address, creatorId: user.id },
  });
  if (existing) {
    throw new Error("Contact already exists.");
  }

  // Create the new contact
  const contact = await prisma.addressBookEntry.create({
    data: {
      name,
      address,
      creatorId: user.id,
    },
  });

  return contact;
}
