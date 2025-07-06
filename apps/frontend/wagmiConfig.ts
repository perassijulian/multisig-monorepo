import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  connectors: [metaMask()],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
