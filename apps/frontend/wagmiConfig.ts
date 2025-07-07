import { createConfig, http } from "wagmi";
import { localhost } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  connectors: [metaMask()],
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
});
