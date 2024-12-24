import IssueDetailsPage from "features/issues/components/issue-details-page";
import { GetStaticProps, GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // Don't pre-render any paths
    fallback: 'blocking' // Generate pages on-demand
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.issueNumber) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      issueNumber: params.issueNumber
    },
    revalidate: 60 // Regenerate page every 60 seconds
  };
};

export default IssueDetailsPage;
