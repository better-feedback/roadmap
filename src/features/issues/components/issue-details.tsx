import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import IssueDetailsHeading from "./issue-details-heading";
import IssueDetailsSidebar from "./issue-details-sidebar";
import IssueDetailsLeftbar from "./issue-details-leftbar";

import { useIssueDetailsQuery } from "../hooks/useIssuesQueries";

export function IssueDetails(props: { issueNumber: number }) {
  const {
    data: issue,
    isLoading,
    isFetching,
  } = useIssueDetailsQuery(props.issueNumber);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!issue) {
    return <div>Not found</div>;
  }

  return (
    <div className="grid grid-cols-5 mx-auto">
          <div className="col-span-5 md:col-span-1 pr-8 row-span-3 mb-8 md:mb-0">
          <IssueDetailsLeftbar issue={issue} />

                  </div>
      <div className="col-span-5 col-start-1 md:col-start-2">
        <IssueDetailsHeading issue={issue} />
      </div>


      <div className="col-span-5 md:col-span-3 col-start-1 md:col-start-2 row-start-auto">

        <div className="prose lg:prose-lg dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {issue.body}
          </ReactMarkdown>
        </div>
      </div>
      <IssueDetailsSidebar issue={issue} />
    </div>
  );
}
