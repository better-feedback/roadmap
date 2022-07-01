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



  return (
    <aside className="space-y-3">
                <article className="p-4 bg-neutral border border-gray-700 rounded-sm">
            <div className="flex items-center">
          

              <div className="ml-1">
                <h5 className="text-lg font-medium text-white">Evmos Proposal Lifecycle</h5>
                <hr className="my-4" />
                <p className="text-xs">Learn how a community proposal goes from idea to execution.</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://github.com/andrewmcodes/hyperui"
                  target="_blank"
                  className="block h-full p-4 border border-gray-700 rounded-lg hover:border-secondary" rel="noreferrer"
                >
                  <h5 className="font-medium text-white">1. Signaling 🚦</h5>

                  <p className="mt-1 text-xs font-medium text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </a>
              </li> 
              <li>
                <a
                  href="https://github.com/andrewmcodes/hyperui"
                  target="_blank"
                  className="block h-full p-4 border border-gray-700 rounded-lg hover:border-secondary" rel="noreferrer"
                >
                  <h5 className="font-medium text-white">2. Proposal Draft 💡</h5>

                  <p className="mt-1 text-xs font-medium text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </a>
              </li>
<li>
                <a
                  href="https://github.com/andrewmcodes/hyperui"
                  target="_blank"
                  className="block h-full p-4 border border-gray-700 rounded-lg hover:border-secondary" rel="noreferrer"
                >
                  <h5 className="font-medium text-white">3. Final & RFC 📝</h5>

                  <p className="mt-1 text-xs font-medium text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/andrewmcodes/hyperui"
                  target="_blank"
                  className="block h-full p-4 border border-gray-700 rounded-lg hover:border-secondary" rel="noreferrer"
                >
                  <h5 className="font-medium text-white">4. Onchain Voting 🌌</h5>

                  <p className="mt-1 text-xs font-medium text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </a>
              </li>

            </ul>
          </article>
     
       <SidebarItemSentiment
        group="Community"
        content={
          <>
          <div className="mb-4">
            <span className="text-sm">Community Sentiment:</span>
            <progress className="progress progress-success w-full bg-gray-200" value="80" max="100"></progress> 
            <span className="text-xs">80% of 40 in favor</span>             
            <progress className="progress progress-accent w-full bg-gray-200" value="12" max="100"></progress> 
            <span className="text-xs">12% of 40 against</span>           
          </div>
          <hr className="py-1" />
          <div className="mb-4">
          <span className="text-sm">Validator Sentiment:</span>
              <progress className="progress progress-success w-full bg-gray-200" value="60" max="100"></progress>
              <span className="text-xs">60% of 18 in favor</span>               
              <progress className="progress progress-accent w-full bg-gray-200" value="25" max="100"></progress>
              <span className="text-xs">25% of 18 against</span>           
            </div>
            <div className="mt-6">

            <div className="alert alert-success shadow-lg text-sm mt-6 justify-start">
    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span className="font-semibold">Passing</span>
  </div>
</div>
            </>
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
          By adding a sponsorship amount to the proposal, you are showing strong support. The bounty will be used to fund the deposit amount if and when the proposal goes to vote onchain.
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
