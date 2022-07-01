import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import StatusLabel from "features/common/components/status-label";
import Button from "features/common/components/button";
import {
  useWalletIsSignedInQuery,
  useWalletSignedInAccountQuery,
} from "features/common/hooks/useWalletQueries";

import { utils } from "near-api-js";

import type { Issue } from "../types";
import type { Bounty } from "../../bounties/types";
import { viewFunction, callFunction } from "features/near/api";
import { parseDate } from "../../../utils/helpers.js";
import { QueryObserverIdleResult } from "react-query";
import { IntegerType } from "mongodb";

export default function IssueDetailsSidebar(props: { issue: Issue }) {
  const router = useRouter();
  const walletIsSignedInQuery = useWalletIsSignedInQuery();
  const walledId = useWalletSignedInAccountQuery();

  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [pool, setPool] = useState("");
  const [poolInDollars, setPoolInDollars] = useState<string>("");
  const [isApplyingToWork, setIsApplyingToWork] = useState(false);
  const [fundsReq, setFundsReq] = useState<string>("50000");


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

  /* A hook that is called when the component is mounted.
  In order to fetch the bounty stored in the contract
 */
  useEffect(() => {
    if (!props.issue) return;
    loadBountyDetails();
  }, []);

  useEffect(() => {
    /* This is a function that is called when a bounty is found. It fetches the current price of
    NEAR from the CoinGecko API and then calculates the value of the bounty pool in USD. */
    (async () => {
      if (!fundsReq) return;
      const apiData = await fetch(
        "https://api.coingecko.com/api/v3/coins/evmos"
      );
      const evmosData = await apiData.json();

      setPoolInDollars(
        (evmosData?.market_data?.current_price?.usd * parseFloat(fundsReq)).toFixed(
          0
        )
      );
    })();
  }, [fundsReq, pool]);

  return (
    <aside className="col-span-5 md:col-span-1 space-y-3 my-4 md:my-0">
      <SidebarItemNoHead
        content={
          <div>
            <span className="font-semibold">Submitted by:</span> {props.issue.user.login}<br />
            <span className="font-semibold">Date Proposed:</span> {<span>{parseDate(props?.issue.created_at)}</span>}
          </div>
        }
      />
      <SidebarItem title="Proposal Stage" content={<StatusLabel status="planned" />} />


      <SidebarItem
        title="Amounted Requested"
        content={
          <div>
            N/A
          </div>
        }
      />

      {bounty && (
        <SidebarItem
          title="Deadline"
          content={<div>{parseDate(bounty?.deadline)}</div>}
        />
      )}
      <SidebarItem
        title="Sponsored By"
        content={
          <div className="flex gap-2 flex-wrap">
            {!bounty
              ? "-"
              : bounty.funders.map((funder: string) => {
                  return <span key={funder}>{funder}</span>;
                })}
          </div>
        }
      />
      <div className="flex flex-col gap-y-4 justify-center pt-4">
        <Button
          onClick={() =>
            router.push(`/issues/${props.issue.number}/add-bounty`)
          }
          disabled={!walletIsSignedInQuery.data}
        >
          Add Sponsorship
        </Button>

      </div>
      {!walletIsSignedInQuery.data && (
        <p className="text-xs text-center mt-2 text-gray-500 dark:text-zinc-500">
          By adding a sponsorship amount to the initiative, you are showing strong support. The EVMOS will be used to fund the deposit amount if and when the proposal goes to vote onchain and the excess amount will be used to reward those that have played a role in solving the problem.
        </p>
      )}
    </aside>
  );
}

function SidebarItem(props: { title: string; content: React.ReactNode }) {
  return (
    <div className="py-4 px-4 space-y-1 border border-gray-700 dark:border-zinc-800 bg-neutral">
      <div className="mb-2 font-semibold">{props.title}</div>
      {props.content}
    </div>
  );
}
function SidebarItemNoHead(props: { content: React.ReactNode }) {
  return (
    <div className="py-4 px-4 space-y-1 border border-gray-700 dark:border-zinc-800 bg-neutral">
      {props.content}
    </div>
  );
}
function SidebarItemSentiment(props: { group: string; content: React.ReactNode }) {
  return (
    <div className="py-4 px-4 space-y-1 border border-gray-700 dark:border-zinc-800 bg-neutral">
      {props.content}
    </div>
  );
}
