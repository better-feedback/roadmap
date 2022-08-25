import { Layout } from "features/common/components/layout";
import { IssuesList } from "./issues-list";
import { issueTypes } from "../constants";

import { useState } from "react";

import type { NextPage } from "next";
import AddIssueModal from "features/common/components/add-issue-modal";

const IssuesListPage: NextPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Layout title="Home">
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-2">
          <IssuesList issueType={issueTypes.OPEN} title="Open" />
          <IssuesList issueType={issueTypes.IN_PROGRESS} title="In Progress" />
          <IssuesList issueType={issueTypes.LIVE} title="Live" />
        </div>
        <div className="mt-2 cursor-pointer border-2 border-gray-200 dark:border-zinc-800 rounded-md w-full h-[4rem] flex items-center justify-center" onClick={() => setIsModalOpen(true)}>
          <span>Add Your Ideas</span>
        </div>
        {
          isModalOpen &&
          <AddIssueModal setIsModalOpen={setIsModalOpen}/>
        }
      </>
    </Layout>
  );
};

export default IssuesListPage;
