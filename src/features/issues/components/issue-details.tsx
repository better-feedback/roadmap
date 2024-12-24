import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from 'next/dynamic';

import IssueDetailsHeading from "./issue-details-heading";
import { useIssueDetailsQuery } from "../hooks/useIssuesQueries";

// Dynamically import the sidebar component to avoid SSR issues
const IssueDetailsSidebar = dynamic(
  () => import('./issue-details-sidebar'),
  { ssr: false }
);

export function IssueDetails(props: { issueNumber: number }) {
  const {
    data: issue,
    isLoading,
    isFetching,
  } = useIssueDetailsQuery(props.issueNumber);

  if (isLoading || !issue) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl grid grid-cols-5 mx-auto">
      <div className="col-span-5">
        <IssueDetailsHeading issue={issue} />
      </div>
      <div className="col-span-5 md:col-span-4">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {issue.body ?? ''}
          </ReactMarkdown>
        </div>
      </div>
      <IssueDetailsSidebar issue={issue} />
    </div>
  );
}
