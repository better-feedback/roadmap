import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/globals.css";
import "../styles/fonts.css";
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, wallet, RainbowKitProvider, Chain, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, ChainProvider, configureChains, createClient, createStorage, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

import type { AppProps } from "next/app";


const evmos: Chain = {
  id: 9001,
  name: 'Evmos',
  network: 'evmos',
  iconUrl: 'https://bafybeideiyj2cmucngncpasud7acdwug2b3uetck4qpkk7nveqqlvzs66a.ipfs.dweb.link/1_s5JqmQ9XsAJmb9sZkOKUFg.png',
  iconBackground: '#000',
  nativeCurrency: {
    decimals: 18,
    name: 'Evmos',
    symbol: 'EVMOS',
  },
  rpcUrls: {
    default: 'https://evmos-mainnet.gateway.pokt.network/v1/lb/62a98f3b123e6f00396a2714',
  },
  testnet: false,
}



const { chains, provider } = configureChains(
  [evmos, chain.mainnet],
  [
    jsonRpcProvider({ rpc: () => ({ http: 'https://evmos-mainnet.gateway.pokt.network/v1/lb/62a98f3b123e6f00396a2714' }) }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Connect to Evmos',
    wallets: [
      wallet.metaMask({ chains }),
      wallet.walletConnect({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider 
            appInfo={{
              appName: 'EvmosTracker',
            }}
            chains={chains}
            theme={darkTheme()}
            >
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
    </RainbowKitProvider>
    </WagmiConfig>
  );
}
