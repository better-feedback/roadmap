export type IssueType = "open" | "planned" | "inProgress";

export type Metadata = {
  bounties: {
    chain: string;
    bountyId: number;
  }[];
};

export type Issue = {
  title: string;
  metadata: Metadata;
  created_at: string;
  number: number;
  body: string;
  user: {
    login: string;
  };
  html_url: string;
};
