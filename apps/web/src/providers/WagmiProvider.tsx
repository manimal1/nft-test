import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { http, WagmiProvider as WagmiProviderBase } from "wagmi";
import { lineaSepolia } from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const wagmiConfig = getDefaultConfig({
  appName: "NFT Test dApp",
  projectId: import.meta.env.VITE_WAGMI_PROJECT_ID,
  chains: [lineaSepolia],
  transports: {
    [lineaSepolia.id]: http(`https://linea-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`),
  },
});

export function WagmiProvider({ children }: { children?: ReactNode }) {
  return (
    <WagmiProviderBase config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProviderBase>
  );
}
