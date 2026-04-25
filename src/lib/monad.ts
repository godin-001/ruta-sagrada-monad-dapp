import { createConfig, fallback, http } from "wagmi";
import { injected } from "wagmi/connectors";
import type { Chain } from "viem";

const monadRpcUrl =
  process.env.NEXT_PUBLIC_MONAD_RPC_URL || "https://testnet-rpc.monad.xyz";

export const monadTestnet: Chain = {
  id: Number(process.env.NEXT_PUBLIC_MONAD_CHAIN_ID || 10143),
  name: "Monad Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MON",
    symbol: "MON",
  },
  rpcUrls: {
    default: {
      http: [monadRpcUrl],
    },
    public: {
      http: [monadRpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: process.env.NEXT_PUBLIC_MONAD_EXPLORER_URL || "https://testnet.monadexplorer.com",
    },
  },
  testnet: true,
};

export const proactibleDemoDonationAddress =
  process.env.NEXT_PUBLIC_PROACTIBLE_DEMO_DONATION_ADDRESS ||
  "0xF39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export const appConfig = createConfig({
  chains: [monadTestnet],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [monadTestnet.id]: fallback([http(monadRpcUrl)]),
  },
  ssr: true,
});

