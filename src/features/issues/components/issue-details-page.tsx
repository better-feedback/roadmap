import { useRouter } from "next/router";

import Layout from "../../common/components/layout";
import { IssueDetails } from "./issue-details";

import type { NextPage } from "next";

type Props = {};

const Issue: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const { issueNumber } = router.query;

  return (
    <Layout title={`Issue ${issueNumber}`}>
      <IssueDetails issueNumber={Number(issueNumber)} />
    </Layout>
  );
};

export default Issue;
