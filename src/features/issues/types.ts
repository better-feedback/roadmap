export type IssueType = "open" | "inProgress" | "live";

export type Metadata = {
  bounties: {
    chain: string;
    bountyId: number;
  }[];
};

export interface Label {
  name: string;
  id: number;
  color: string;
}

export type Issue = {
  title: string;
  metadata: Metadata;
  created_at: string;
  number: number;
  body: string;
  url: string;
  labels: Label[];
  user: {
    login: string;
  };
  html_url: string;
};
