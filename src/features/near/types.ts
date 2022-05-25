export type Proposal = {
  transactionHash: string;
  updateTransactionHash: string;
  createTimestamp: number;
  updateTimestamp: number;
  id: string;
  proposalId: number;
  daoId: string;
  proposer: string;
  description: string;
  status:
    | "InProgress"
    | "Approved"
    | "Rejected"
    | "Removed"
    | "Expired"
    | "Moved";
};
