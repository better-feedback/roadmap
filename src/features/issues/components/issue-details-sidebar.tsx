import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import StatusLabel from "features/common/components/status-label";
import Button from "features/common/components/button";
import {
  useWalletChainQuery,
  useWalletIsSignedInQuery,
  useWalletSignedInAccountQuery,
} from "features/common/hooks/useWalletQueries";
import { AiFillGithub } from "react-icons/ai";

import { useUser } from '@auth0/nextjs-auth0'

import { contractConfig } from "utils/solidity/defaultConfig"

// import { utils } from "near-api-js";




import type { Issue } from "../types";
import type { Bounty } from "../../bounties/types";
import { viewFunction, callFunction } from "features/near/api";
import { parseDate } from "../../../utils/helpers.js";
import { QueryObserverIdleResult } from "react-query";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { formatEther } from "ethers";
import axios from "axios";





export default function IssueDetailsSidebar(props: { issue: Issue }) {
  const router = useRouter();
  const walletIsSignedInQuery = useWalletIsSignedInQuery();
  const walletId = useWalletSignedInAccountQuery();
  const { data: walletChain } = useWalletChainQuery();
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [pool, setPool] = useState("");
  const [poolInDollars, setPoolInDollars] = useState<string>("");
  const [maticPriceInDollars, setMaticPriceInDollars] = useState<string>("");
  const [isApplyingToWork, setIsApplyingToWork] = useState(false);
  const { address, isConnected } = useAccount();
  const { user } = useUser();

  const bountySolidity = useContractRead({
    ...contractConfig,
    functionName: "getBountyById",
    args: [props.issue?.url ?? ""],
    enabled: !!props.issue?.url && typeof window !== 'undefined',
  });

  const loadBountyDetails = async () => {
    if (!props.issue?.url) return;
    try {
      const res = await viewFunction("getBountyByIssue", { issueId: props.issue.url });
      setBounty(res);
      if (res?.pool) {
        setPool(formatEther(res.pool));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBountyDetails();
  }, [props.issue?.url]);

  const isNotConnectedToWallet = () => {
    if (typeof window === 'undefined') return true;
    const walletChainFromLocalStorage = localStorage.getItem("wallet-chain");
    if (!walletChainFromLocalStorage) return true;
    
    return walletChainFromLocalStorage === "near" 
      ? !walletIsSignedInQuery.data
      : !isConnected;
  };

  const getWalletId = () => {
    const walletChain = localStorage.getItem("wallet-chain")

    let connectedWalletId;

    if (walletChain === "near") {

      connectedWalletId = walletId.data
    } else if (walletChain === "polygon") {
      connectedWalletId = address
    } else {
      connectedWalletId = "Unknown"
    }

    return connectedWalletId
  }


  const postComment = async () => {

    try {
      const result = await axios.post("/api/comment/startWorkComment", {
        id: user ? user.sub : null,
        issueNumber: props.issue.number,
        isGitAuthed: user ? true : false,
        walletId: getWalletId()
      }) as any


      console.log(props.issue.html_url)

      setTimeout(() => {
        window.open(props.issue.html_url, "_blank")
      })
      console.log("Comment posted")

    } catch (e) {
      console.log(e)
    }
  }


  const { write: startWorkPolygon } = useContractWrite({
    ...contractConfig,
    functionName: 'startWork',
    args: [props.issue?.url ?? ""],
    enabled: !!props.issue?.url && typeof window !== 'undefined',
    onError: (error) => {
      setIsApplyingToWork(false);
      alert(error);
    },
    onSuccess: async () => {
      setIsApplyingToWork(false);
      await postComment();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  });




  const isExpired = () => {
    const localStorageChain = localStorage.getItem("wallet-chain")

    if (!localStorageChain) {
      return false
    }

    if (localStorageChain === "near") {
      return !bounty ? false : Math.floor(Date.now() / 1000) > parseInt(bounty?.deadline);
    } else {
      if (bountySolidity?.data?.id !== "") {

        return Math.floor(Date.now() / 1000) > parseInt(bountySolidity?.data?.deadline);
      } else {
        return false
      }
    }
  }

  const isStartWorkDisabled = () => {
    let isDisabled = true;


    if (walletChain === "near") {
      isDisabled = !bounty ||
        !walletIsSignedInQuery.data ||
        bounty?.workers?.includes(walletId?.data) || isApplyingToWork
    } else if (walletChain === "polygon") {
      isDisabled = !isConnected || isApplyingToWork || bountySolidity?.data?.id == "" || (bountySolidity?.data?.workers?.includes(address) || bountySolidity.isLoading)
    }


    return isDisabled;
  }

  useEffect(() => {
    /* This is a function that is called when a bounty is found. It fetches the current price of
    NEAR from the CoinGecko API and then calculates the value of the bounty pool in USD. */
    (async () => {
      if (!bounty) return;
      const apiData = await fetch(
        "https://api.coingecko.com/api/v3/coins/near"
      );
      const nearData = await apiData.json();

      setPoolInDollars(
        (nearData?.market_data?.current_price?.usd * parseFloat(pool)).toFixed(
          2
        )
      );
    })();
  }, [bounty, pool]);

  useEffect(() => {
    (async () => {
      if (!bountySolidity.isSuccess || bountySolidity?.data?.id === "") return;
      const apiData = await fetch(
        "https://api.coingecko.com/api/v3/coins/matic-network"
      );
      const maticPrice = await apiData.json();

      // setMaticPriceInDollars(
      //   (maticPrice?.market_data?.current_price?.usd * parseFloat(ethers.utils.formatEther(bountySolidity?.data?.pool).toString())).toFixed(
      //     2
      //   )
      // );
    })();
  }, [bountySolidity.data])

  return (
    <aside className="col-span-5 md:col-span-1 my-4 border-t-2 border-gray-100 dark:border-zinc-800 md:my-0 md:border-t-0">
      <SidebarItem title="Status" content={<StatusLabel status={isExpired() ? "Expired" : "Open"} />} />
      <SidebarItem
        title="Total bounty sum"
        content={
          <>
            <div>
              {!bounty ? "-" : pool + " Near"} - ${poolInDollars}
            </div>
            <div>
              {bountySolidity?.data?.id === "" || bountySolidity.isLoading ? "-" : formatEther(bountySolidity?.data?.pool ? bountySolidity?.data?.pool : 0).toString() + " Matic"} - ${maticPriceInDollars}
            </div>
          </>
        }
      />
      {(bounty !== null || bountySolidity?.data?.id !== "") && (
        <SidebarItem
          title="Deadline"
          content={
            <>
              <div>Near: {bounty?.deadline ? parseDate(bounty.deadline) : "-"}</div>
              <div>
                Polygon: {bountySolidity?.data?.id && !bountySolidity.isLoading 
                  ? parseDate(bountySolidity.data.deadline) 
                  : "-"}
              </div>
            </>
          }
        />
      )}
      <SidebarItem
        title="Funders"
        content={
          <div className="flex gap-2 flex-wrap">
            {bounty?.funders?.map((funder: string) => (
              <span key={funder}>{funder}</span>
            )) ?? "-"}
          </div>
        }
      />
      <div className="flex flex-col gap-y-4 justify-center pt-4">
        <Button
          onClick={() =>
            router.push(`/issues/${props.issue.number}/add-bounty`)
          }
          disabled={isNotConnectedToWallet() || isExpired()}
        >
          Add Bounty
        </Button>

        <Button
          onClick={async () => {
            setIsApplyingToWork(true);

            /* Calling the startWork function in the contract. */
            if (walletChain === "near") {

              callFunction("startWork", { issueId: props.issue.url })
                .then(async () => {
                  setIsApplyingToWork(false);
                  await postComment()
                  loadBountyDetails();

                })
                .catch((error) => {
                  setIsApplyingToWork(false);
                  alert(error);
                });

            }
            else {
              startWorkPolygon()
            }
          }}
          disabled={
            isStartWorkDisabled() || isExpired()
          }
        >
          {isApplyingToWork ? "Loading..." : "Start Work"}
        </Button>
      </div>
      {(isNotConnectedToWallet()) && (
        <p className="text-xs text-center mt-2 text-gray-500 dark:text-zinc-500">
          Connect a wallet to add bounties.
        </p>
      )}
      <div className="flex flex-col gap-y-4 justify-center pt-4">
        <a
          className="flex flex-row items-center space-x-2 px-4 py-2 rounded-md bg-pink-500 text-white shadow-lg shadow-pink-500/40 hover:brightness-150"
          href={props.issue.html_url}
          target="_blank"
          rel="noreferrer"
        >
        <AiFillGithub className="text-[1.5rem] cursor-pointer w-4 h-4 mr-2"/>
          View on GitHub
        </a>
      </div>
    </aside>
  );
}

function SidebarItem(props: { title: string; content: React.ReactNode }) {
  return (
    <div className="py-4 border-b-2 border-gray-100 dark:border-zinc-800">
      <div className="mb-1 font-semibold">{props.title}:</div>
      {props.content}
    </div>
  );
}
