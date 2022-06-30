import Link from "next/link";

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
  const signedInAccountQuery = useWalletSignedInAccountQuery();
  const canVote = useVotingAccessQuery();
  const addVote = useVote();
  const { data } = useIssueVoteCount(issue.number);

  return (
    <li className="py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-200 cursor-pointer overlow flex justify-between ">
      <Link passHref href={`/issues/${issue.number}`}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-semibold">{issue.title}</h3>
            <div className="text-xs">
              {`#${issue.number} opened on ${issue.created_at} by ${issue.user.login}`}
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
      <div className="flex flex-col justify-center items-center ">
        <span>{data?.votes}</span>
        <IoIosArrowUp
          className={`text-[1.5rem] h-5	opacity-50 transition-all duration-300 hover:opacity-100 ${
            data?.voters?.includes(signedInAccountQuery.data + "_up") &&
            "text-[#FF6CE5] opactity-100"
          }`}
          onClick={async (e) => {
            e.stopPropagation();
            if (!signedInAccountQuery.data)
              return alert("You need to be signed in");
            if (!canVote.data) return alert("You don't have access to vote");
            try {
              addVote.mutate({
                issueNumber: issue.number,
                isUpVote: true,
                walletId: signedInAccountQuery.data,
              });
            } catch (e) {
              console.error(e);
            }
          }}
        />
        <IoIosArrowDown
          onClick={(e) => {
            e.stopPropagation();
            if (!signedInAccountQuery.data)
              return alert("You need to be signed in");
            if (!canVote.data) return alert("You don't have access to vote");
            try {
              addVote.mutate({
                issueNumber: issue.number,
                isUpVote: false,
                walletId: signedInAccountQuery.data,
              });
            } catch (e) {
              console.error(e);
            }
          }}
          className={`text-[1.5rem] h-5 opacity-50 transition-all duration-300 hover:opacity-100 ${
            data?.voters?.includes(signedInAccountQuery.data + "_down") &&
            "text-red-500"
          }`}
        />
      </div>
    </li>
  );
}
