import React from "react";
import { useRouter } from "next/router";
import Button from "./button";
import SelectChainModal from "./select-chain-modal";
import ChainIcon from "./chain-icon";

import {
  useWalletChainQuery,
  useWalletSignedInAccountQuery,
  useWalletSignInMutation,
  useWalletSignOutMutation,
} from "../hooks/useWalletQueries";
import config from "config";

export default function ConnectWalletButton() {
  const router = useRouter();

  const [isSelectChainModalOpen, setIsSelectChainModalOpen] =
    React.useState(false);

  const walletChainQuery = useWalletChainQuery();
  const signedInAccountQuery = useWalletSignedInAccountQuery();
  const signInMutation = useWalletSignInMutation();
  const signOutMutation = useWalletSignOutMutation();

  async function handleSelectChain(chain: string) {
    signInMutation.mutate(chain);
  }

  async function handleDisconnectWallet() {
    let path = window.location.pathname;
    if (path.includes("add-bounty")) {
      router.replace(`/issues/${path.split("/")[2]}`);
    }

    setTimeout(() => {
      signOutMutation.mutate();
    }, 1000);
  }

  if (walletChainQuery.data && signedInAccountQuery.data) {
    return (
      <div className="flex flex-row items-center">
        <Button type="iconDisconnect" onClick={handleDisconnectWallet}>
          <ChainIcon
            size={20}
            chainName={walletChainQuery.data}
            className="dark:fill-gray-300 fill-gray-500 w-4 h-4"
          />
          <div>{signedInAccountQuery.data}</div>
          <svg className="dark:stroke-gray-300 stroke-gray-500" width="10" height="20" viewBox="0 0 10 24">
            <path d="M9 1L1 9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 1L9 9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button type="iconConnect" onClick={() => setIsSelectChainModalOpen(true)}>
        <svg className="stroke-current w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 15L13 10L8 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 10H1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Connect Wallet</span>
      </Button>
      <SelectChainModal
        isOpen={isSelectChainModalOpen}
        onClose={() => setIsSelectChainModalOpen(false)}
        onSelectChain={handleSelectChain}
        enabledChains={config.site.enabledChains}
      />
    </>
  );
}
