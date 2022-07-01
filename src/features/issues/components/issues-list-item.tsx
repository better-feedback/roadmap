import Link from "next/link";
import { useAccount, useEnsName } from 'wagmi'
import { parseDate } from '../../../utils/helpers'
import ListItemMetadata from "./list-item-metadata";

import type { Issue, Label } from "../types";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useWalletSignedInAccountQuery } from "features/common/hooks/useWalletQueries";

import {
  useVotingAccessQuery,
  useIssueVoteCount,
  useVote,
} from "features/common/hooks/useGuildQueries";
import { upsertMetadataComment } from "features/api-routes/api/github";

import { Octokit } from "octokit";
import config from "config";

const octokit = new Octokit({ auth: config.github.pat });

type Props = {
  issue: Issue;
};

export function IssuesListItem(props: Props) {
  const { issue } = props;
  const canVote = useAccount()
  const addVote = useVote();
  const { data } = useIssueVoteCount(issue.number);
  const issueDate = parseDate(issue.created_at);
  console.log(canVote)
  return (
    <li className="flex w-full justify-between bg-white hover:shadow-xl cursor-pointer overlow mb-0 pb-0">
<Link passHref href={`/issues/${issue.number}`}>
    <div className="p-6 bg-white rounded-none shadow border-b border-b-slate-300 w-full">
    <div className="flex flex-row justify-between mb-4">
    <div className="flex flex-col mb-2 pr-2 ">
      <h3 className="mb-2 font-bold" data-config-id="title1">{issue.title}</h3>
      <hr className="w-5/6 mb-2"/>
      <p className="text-sm text-gray-500" data-config-id="desc1"><span className="font-semibold">Issue Opened:</span> {`${issueDate}
      `}</p>      
      <p className="text-sm text-gray-500" data-config-id="desc1"><span className="font-semibold">Submitted by:</span> {`${issue.user.login}`}</p>


    </div>
    <div className="flex flex-col h-fit justify-start items-center bg-slate-200 p-2 rounded-md">
        <span>{data?.votes}</span>
        <IoIosArrowUp
          className={`text-[1.5rem] opacity-50 transition-all duration-300 hover:opacity-100 ${
            data?.voters?.includes(canVote.data?.address + "_up") &&
            "text-[#2081e2] opactity-100"
          }`}
          onClick={async (e) => {
            e.stopPropagation();
            if (!canVote)
              return alert("You need to be signed in");
            if (!canVote.data) return alert("You don't have access to vote");
            try {
              addVote.mutate({
                issueNumber: issue.number,
                isUpVote: true,
                walletId: canVote?.data?.address,
              });
            } catch (e) {
              console.error(e);
            }
          }}
        />
        <IoIosArrowDown
          onClick={(e) => {
            e.stopPropagation();
            if (!canVote)
              return alert("You need to be signed in");
            if (!canVote.data) return alert("You don't have access to vote");
            try {
              addVote.mutate({
                issueNumber: issue.number,
                isUpVote: false,
                walletId: canVote?.data?.address,
              });
            } catch (e) {
              console.error(e);
            }
          }}
          className={`text-[1.5rem] opacity-50 transition-all duration-300 hover:opacity-100 ${
            data?.voters?.includes(canVote?.data?.address + "_down") &&
            "text-red-500"
          }`}
        />
      </div>
      </div>
    <div className="flex justify-between">
    
      <div className="flex">
        <a className="flex mr-4 items-center text-xs text-gray-500" href="#">
          <span className="mr-2">
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83317 8.16666H4.83317C4.61216 8.16666 4.4002 8.25446 4.24392 8.41074C4.08764 8.56702 3.99984 8.77898 3.99984 8.99999C3.99984 9.22101 4.08764 9.43297 4.24392 9.58925C4.4002 9.74553 4.61216 9.83333 4.83317 9.83333H9.83317C10.0542 9.83333 10.2661 9.74553 10.4224 9.58925C10.5787 9.43297 10.6665 9.22101 10.6665 8.99999C10.6665 8.77898 10.5787 8.56702 10.4224 8.41074C10.2661 8.25446 10.0542 8.16666 9.83317 8.16666ZM13.1665 4.83333H4.83317C4.61216 4.83333 4.4002 4.92112 4.24392 5.0774C4.08764 5.23369 3.99984 5.44565 3.99984 5.66666C3.99984 5.88767 4.08764 6.09964 4.24392 6.25592C4.4002 6.4122 4.61216 6.49999 4.83317 6.49999H13.1665C13.3875 6.49999 13.5995 6.4122 13.7558 6.25592C13.912 6.09964 13.9998 5.88767 13.9998 5.66666C13.9998 5.44565 13.912 5.23369 13.7558 5.0774C13.5995 4.92112 13.3875 4.83333 13.1665 4.83333ZM14.8332 0.66666H3.1665C2.50346 0.66666 1.86758 0.930052 1.39874 1.39889C0.929896 1.86773 0.666504 2.50362 0.666504 3.16666V11.5C0.666504 12.163 0.929896 12.7989 1.39874 13.2678C1.86758 13.7366 2.50346 14 3.1665 14H12.8248L15.9082 17.0917C15.986 17.1689 16.0784 17.23 16.1799 17.2715C16.2814 17.3129 16.3902 17.334 16.4998 17.3333C16.6092 17.3361 16.7176 17.3133 16.8165 17.2667C16.9687 17.2041 17.099 17.098 17.1909 16.9615C17.2828 16.8251 17.3323 16.6645 17.3332 16.5V3.16666C17.3332 2.50362 17.0698 1.86773 16.6009 1.39889C16.1321 0.930052 15.4962 0.66666 14.8332 0.66666ZM15.6665 14.4917L13.7582 12.575C13.6803 12.4978 13.588 12.4367 13.4864 12.3952C13.3849 12.3537 13.2762 12.3327 13.1665 12.3333H3.1665C2.94549 12.3333 2.73353 12.2455 2.57725 12.0892C2.42097 11.933 2.33317 11.721 2.33317 11.5V3.16666C2.33317 2.94565 2.42097 2.73369 2.57725 2.5774C2.73353 2.42112 2.94549 2.33333 3.1665 2.33333H14.8332C15.0542 2.33333 15.2661 2.42112 15.4224 2.5774C15.5787 2.73369 15.6665 2.94565 15.6665 3.16666V14.4917Z" fill="currentColor"></path>
            </svg>
          </span>
          <span data-config-id="val1-1">{ issue.comments }</span>
        </a>
        <a className="flex items-center text-xs text-gray-500" href="#">
          <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
</svg>
          </span>
          <span data-config-id="val1-2"> {issue.number} </span>
        </a>
      
      </div>
      <div className="flex items-center justify-items-end space-x-2">
      {issue?.labels.map((label: Label) => {
        return (
          <div
            key={label.id}
            className={`inline-flex items-center justify-end bg-transparent text-gray-500`}
          >
            <span className={`inline-block py-1 px-2 bg-blue-50 text-xs text-neutral rounded-md`}
            style={{ backgroundColor: `#${label.color}`}}>{label.name}</span>
          </div>
        );
        })}
    </div>
    </div>


      <ListItemMetadata metadata={issue.metadata} />
    
      </div>
      </Link>
    </li>
    
  );
}
