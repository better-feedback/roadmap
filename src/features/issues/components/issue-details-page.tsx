import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import Layout from "../../common/components/layout";

const IssueDetails = dynamic(
  () => import("./issue-details").then(mod => mod.IssueDetails),
  { 
    ssr: false,
    loading: () => (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4"></div>
        </div>
      </div>
    )
  }
);

type Props = {
  issueNumber?: string | number;
};

const IssueDetailsPage = ({ issueNumber: staticIssueNumber }: Props) => {
  const router = useRouter();
  const { issueNumber: queryIssueNumber } = router.query;
  
  const issueNumber = staticIssueNumber || queryIssueNumber;

  if (!issueNumber || Array.isArray(issueNumber)) {
    return (
      <Layout title="Invalid Issue">
        <div>Invalid issue number</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Issue ${issueNumber}`}>
      <IssueDetails issueNumber={Number(issueNumber)} />
    </Layout>
  );
};

export default IssueDetailsPage;
