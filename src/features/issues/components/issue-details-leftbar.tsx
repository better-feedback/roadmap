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
              <SidebarItem
          title="About Evmos Vision"
          content={<div className="text-xs">EvmosVision is a project led by LPX to help the Evmos network develop strong governance practices and provide tools that will help the community stay up to date with the ongoing governance efforts.</div>}
        />              

    <SidebarItemLink
      title="Evmos Governance Paradigm Problem Spaces"
      subtitle="Read the article"
      link="https://evmos.vision/articles/evmos-governance-problem-space"
      content={<div className="text-xs mt-2">Analysis: current problem spaces that must be addressed in the Evmos governance process.</div>}
    />
    <SidebarItemLink
      title="Have an awesome idea or project?"
      subtitle="Get help"
      link="https://evmos.vision"
      content={<div className="text-xs mt-2">While the governance framework is under work, let us help you write a killer proposal.</div>}
    />
              
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
function SidebarItemLink(props: { title: string; subtitle: string; link: string; content: React.ReactNode }) {
  return (
<a className="mt-4 block p-4 bg-neutral border border-gray-700 shadow-xl rounded-sm group hover:shadow-lg" href={`${props.link}`}>
  <h3 className="text-base font-medium text-white group-hover:text-gray-400">{ props.title }</h3>
  { props.content }
  <div className="inline-flex items-center mt-4 text-gray-300">
    <p className="text-sm font-medium">{ props.subtitle } </p>
        <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 ml-1 transition-transform transform group-hover:translate-x-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
  </div>
</a>
  );
}
