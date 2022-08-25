import Link from "next/link";

import ListItemMetadata from "./list-item-metadata";

import type { Issue, Label } from "../types";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useWalletChainQuery, useWalletSignedInAccountQuery } from "features/common/hooks/useWalletQueries";

import { CommentMatadata } from "./../../../features/api-routes/api/github/types";

import {
  useVotingAccessQuery,
  useIssueVoteCount,
  useVote,
} from "features/common/hooks/useGuildQueries";
import { upsertMetadataComment } from "features/api-routes/api/github";

import { Octokit } from "octokit";
import config from "config";

import { useAccount, useContractRead } from "wagmi";
import { contractConfig } from "utils/solidity/defaultConfig";

import NearLogo from "../../common/components/icons/near-logo"
import PolygonLogo from "../../common/components/icons/polygon-logo"
import { ethers } from "ethers";
import { viewFunction } from "features/near/api";
import { useEffect, useState } from "react";
import { utils } from "near-api-js";

const octokit = new Octokit({ auth: config.github.pat });

type Props = {
  issue: Issue;
};

export function IssuesListItem(props: Props) {
  const { issue } = props;
  const signedInAccountQuery = useWalletSignedInAccountQuery();
  const canVote = useVotingAccessQuery();
  const { data: walletChain } = useWalletChainQuery()
  const addVote = useVote();
  const { data } = useIssueVoteCount(issue.number);
  const [bounty, setBounty] = useState(null);
  const [pool, setPool] = useState("");

  const { isConnected, address } = useAccount()



  const hasUserVotes = (VoteType: string): boolean => {
    return walletChain === "near" ? (data as CommentMatadata)?.voters?.includes(
      signedInAccountQuery.data + VoteType
    ) : (data as CommentMatadata)?.voters?.includes(
      address + VoteType
    )
  }

  const isUserConnected = () => {
    return walletChain === "near" ? signedInAccountQuery.data : isConnected
  }


  const loadBountyDetails = () => {
    viewFunction("getBountyByIssue", { issueId: props.issue.url })
      .then((res) => {
        setBounty(res);
        setPool(utils.format.formatNearAmount(res?.pool));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bountySolidity = useContractRead({
    ...contractConfig,
    functionName: "getBountyById",
    args: props.issue.url,
    watch: true,
  });

  useEffect(() => {
    loadBountyDetails()
  }, [])


  return (
    <li className="py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-200 cursor-pointer overlow flex justify-between ">
      <Link passHref href={`/issues/${issue.number}`}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-semibold">{issue.title}</h3>
            <div className="text-xs">
              {`#${issue.number} opened on ${issue.created_at} by ${issue.user.login}`}
            </div>

            <div className="flex w-full gap-x-2 py-2">
              <div className="flex items-center gap-x-2">
                <NearLogo className="h-6" />
                <span>{bounty != null ? pool : "-"} Near</span>
              </div>

              <div className="flex items-center gap-x-2">
                <PolygonLogo className="h-6" />
                <span>{bountySolidity?.data?.id !== "" ? ethers.utils.formatEther(bountySolidity?.data?.pool || "0").toString() : "-"} MATIC</span>
              </div>

            </div>

            <div className="flex gap-2 flex-wrap mt-1">
              {issue?.labels.map((label: Label) => {
                return (
                  <div
                    key={label.id}
                    className={`inline-flex items-center justify-center px-2 border-2 border-gray-200 dark:border-zinc-800 rounded-md bg-transparent text-gray-500`}
                  >
                    <span className={`text-sm`}>{label.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
      <ListItemMetadata metadata={issue.metadata} />
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-1 pr-1">
          <IoIosArrowUp
            className={`text-[1.5rem] h-5	opacity-50 transition-all duration-300 hover:opacity-100 ${hasUserVotes("_up") && "text-[#FF6CE5] opactity-100"
              }`}
            onClick={async (e) => {
              e.stopPropagation();
              if (!isUserConnected())
                return alert("To be able to vote, sign in to your wallet and get your address whitelisted by the team");
              if (!canVote.data) return alert("To get vote access, get your address whitelisted by the team");
              try {
                addVote.mutate({
                  issueNumber: issue.number,
                  isUpVote: true,
                  walletId: walletChain === "near" ? signedInAccountQuery.data as string : address as string,
                });
              } catch (e) {
                console.error(e);
              }
            }}
          />
          <IoIosArrowDown
            onClick={(e) => {
              e.stopPropagation();
              if (!isUserConnected())
                return alert("To be able to vote, sign in to your wallet and get your address whitelisted by the team");
              if (!canVote.data) return alert("To get vote access, get your address whitelisted by the team");
              try {
                addVote.mutate({
                  issueNumber: issue.number,
                  isUpVote: false,
                  walletId: walletChain === "near" ? signedInAccountQuery.data as string : address as string,
                });
              } catch (e) {
                console.error(e);
              }
            }}
            className={`text-[1.5rem] h-5 opacity-50 transition-all duration-300 hover:opacity-100 ${hasUserVotes("_down") && "text-red-500"
              }`}
          />
        </div>


        <div className="flex flex-col justify-center items-center text-sm">
          <span>{(data as CommentMatadata)?.upVotes}</span>
          <span>{(data as CommentMatadata)?.downVotes}</span>
        </div>
      </div>
    </li>
  );
}
