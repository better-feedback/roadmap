export type BountyParams = {
  issueNumber: number;
  issueDescription: string;
  token: string;
  amount: string;
  maxDeadline: number;
};

export type Bounty = {
  issueId: string;
  pool: string;
  funders: string[];
  workers: string[];
  status: string;
  deadline: string;
};
