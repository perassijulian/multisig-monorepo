// TODO define if this is needed

import { getMultisigToAPI } from "../api/multisigs";

type WalletType = `0x${string}`;

export async function getMultisigsFromUser(wallet: WalletType) {
  return await getMultisigToAPI({ wallet });
}
