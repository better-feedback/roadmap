import { Layout } from "features/common/components/layout";
import { IssuesList } from "./issues-list";
import { issueTypes } from "../constants";

import type { NextPage } from "next";

const IssuesListPage: NextPage = () => {
  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
        <IssuesList issueType={issueTypes.OPEN} title="Open" />
        <IssuesList issueType={issueTypes.IN_PROGRESS} title="In Progress" />
        <IssuesList issueType={issueTypes.LIVE} title="Live" />
      </div>
    </Layout>
  );
};

export default IssuesListPage;
