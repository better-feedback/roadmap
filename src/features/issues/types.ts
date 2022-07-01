export type IssueType = "planned" | "inprogress" | "proposed" | "onchain";

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
    address: string;
  };
  html_url: string;
  color: string;
  comments: number;
};
