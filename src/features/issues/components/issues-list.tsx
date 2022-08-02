import React, { useEffect } from "react";

import { IssuesListItem } from "./issues-list-item";
import { useIssuesQuery } from "../hooks/useIssuesQueries";

import type { IssueType } from "../types";

export function IssuesList(props: { title: string; issueType: IssueType }) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useIssuesQuery(props.issueType, currentPage);

  return (
    <div className="border-2 border-gray-200 dark:border-zinc-800 rounded-md">
      <div className="flex flex-row border-b-2 border-gray-200 dark:border-zinc-800 px-4 py-2">
        <h3 className="font-bold">{props.title}</h3>
      </div>
      <ul>
        {isLoading ? (
          <div className="text-center p-4">Loading...</div>
        ) : isError ? (
          <div className="text-center p-4">Error: {error}</div>
        ) : data.length === 0 ? (
          <div className="text-center p-4">No issues</div>
        ) : (
          data.map((issue) => (
            <IssuesListItem key={issue.number} issue={issue} />
          ))
        )}
      </ul>
    </div>
  );
}
