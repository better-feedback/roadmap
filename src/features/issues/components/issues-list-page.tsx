import { Layout } from "features/common/components/layout";
import { HomeHeader } from "features/common/components/homeheader";
import { IssuesList } from "./issues-list";
import { issueTypes } from "../constants";

import type { NextPage } from "next";

const IssuesListPage: NextPage = () => {
  return (
    <Layout title="Home">
      <div>
      <HomeHeader />
      <div className="grid sm:grid-cols-1 sm:space-x-0 sm:space-y-2 md:space-y-0 md:grid-cols-4 md:space-x-4 text-gray-800">
        <IssuesList issueType={issueTypes.PLANNED} colColor="border-blue-300" title="Known Issue or Task"  icon="fa-solid fa-circle-exclamation"/>
        <IssuesList issueType={issueTypes.INPROGRESS} colColor="border-yellow-300" title="In Progress"  icon="fa-solid fa-building-columns"/>
        <IssuesList issueType={issueTypes.PROPOSED} colColor="border-orange-300" title="Proposed to Community"  icon="fa-solid fa-bullhorn"/>
        <IssuesList issueType={issueTypes.ONCHAIN} colColor="border-green-300" title="Onchain Voting" icon="fa-solid fa-check-to-slot" />
      </div>
      </div>
    </Layout>
  );
};

export default IssuesListPage;
