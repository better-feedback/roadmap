import React from "react";
import { useRouter } from "next/router";
import Layout from "features/common/components/layout";
import AddBounty from "./add-bounty";

import type { NextPage } from "next";

const AddBountyPage: NextPage = () => {
  const router = useRouter();
  const { issueNumber } = router.query;

  return (
    <Layout title={`Add bounty`}>
      <AddBounty issueNumber={Number(issueNumber)} />
    </Layout>
  );
};

export default AddBountyPage;
