import { getVoteCount } from "features/common/hooks/useGuildQueries";
import { useQuery } from "react-query";

import { getIssues, getIssueByNumber } from "../api";

import type { IssueType } from "../types";

export function useIssuesQuery(issueType: IssueType, page: number) {
  return useQuery(["issues", issueType, page], async () => {
    const issues = await getIssues(issueType, {
      page,
      perPage: 10,
    });

    const issueVotes: any = {};

    for (const issue of issues) {
      const vote = await getVoteCount(issue.number);
      issueVotes[issue.number] = vote;
    }

    return issues.sort(
      (a, b) =>
        issueVotes[b.number].upVotes -
        issueVotes[b.number].downVotes -
        (issueVotes[a.number].upVotes - issueVotes[a.number].downVotes)
    );
  });
}

export function useIssueDetailsQuery(issueNumber: number) {
  return useQuery(
    ["issues", issueNumber],
    () => getIssueByNumber(issueNumber),
    { enabled: Boolean(issueNumber) }
  );
}
