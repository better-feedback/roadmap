import Link from "next/link";

import ConnectWalletButton from "./connect-wallet-button";
import config from "config";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Button from "./button";

import { useAccount } from 'wagmi'
import { useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0'

import { useWalletChainQuery } from "../hooks/useWalletQueries";

import { AiFillGithub } from "react-icons/ai";

export default function HeaderNav() {

  const { isDisconnected } = useAccount()

  const { data: walletChain = "" } = useWalletChainQuery();

  const { user, error, isLoading } = useUser();


  // Removing the wallet from local storage when the user disconnects it (Polygon only)
  useEffect(() => {
    const localStorageWallet = localStorage.getItem("wallet-chain")

    if (isDisconnected && localStorageWallet === "polygon") {
      localStorage.removeItem('wallet-chain')
    }
  }, [isDisconnected])



  return (
    <header className="shadow-md dark:bg-zinc-800">
      <nav className="container mx-auto p-4 flex flex-row justify-between items-center">

        <Link className="font-bold" href={{ pathname: "/" }}>{config.site.title}</Link>
        <div className="flex items-center gap-x-4">


          <div>

              {user ?
              <Button type="iconDisconnect" onClick={() => {
                window.location.assign('/api/auth/logout')
              }}>
                <AiFillGithub className="text-[1.5rem] cursor-pointer w-4 h-4"/>
                <div>{user.nickname}</div>
                <svg className="dark:stroke-gray-300 stroke-gray-500" width="10" height="20" viewBox="0 0 10 24">
                  <path d="M9 1L1 9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1 1L9 9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Button>

              :
            <Button type="iconConnect" onClick={() =>  window.location.assign('/api/auth/login')}>
              <AiFillGithub className="text-[1.5rem] cursor-pointer w-4 h-4"/>
              <div>Login</div>
            </Button>
            }
            {/*<ChainIcon
              size={20}
              chainName={walletChainQuery.data}
              className="dark:fill-gray-300 dark:text-white"
            />*/}

          </div>


          {(walletChain === "near" || !walletChain) || isDisconnected ? <ConnectWalletButton />
            : <ConnectButton />}</div>
      </nav>
    </header>
  );
}
