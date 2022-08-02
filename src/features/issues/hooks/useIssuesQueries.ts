import { useQuery } from "react-query";

import { getIssues, getIssueByNumber } from "../api";

import type { IssueType } from "../types";

export function useIssuesQuery(issueType: IssueType, page: number) {
  return useQuery(["issues", issueType, page], () =>
    getIssues(issueType, {
      page,
      perPage: 10,
    })
  );
}

export function useIssueDetailsQuery(issueNumber: number) {
  return useQuery(
    ["issues", issueNumber],
    () => getIssueByNumber(issueNumber),
    { enabled: Boolean(issueNumber) }
  );
}
