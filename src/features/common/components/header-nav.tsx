import Link from "next/link";

import ConnectWalletButton from "./connect-wallet-button";
import config from "config";
import { ConnectButton } from '@rainbow-me/rainbowkit';

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

        <Link href={{ pathname: "/" }}>{config.site.title}</Link>
        <div className="flex items-center gap-x-4">
          <div className="">

            {user ? <div className="flex flex-col items-center gap-x-2">
              <div className=" flex items-center  mr-2">




                <span>{user.nickname}</span>
              </div>
              <a onClick={() => {
                window.location.assign('/api/auth/logout')
              }} className="text-[#FF6CE5]">Disconnect</a>

            </div> : 
              <AiFillGithub onClick={() =>  window.location.assign('/api/auth/login')} className="text-[1.5rem] cursor-pointer"/>
            }
          </div>
          {(walletChain === "near" || !walletChain) || isDisconnected ? <ConnectWalletButton />
            : <ConnectButton />}</div>
      </nav>
    </header>
  );
}
