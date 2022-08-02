export type Metadata = {
  bounties: {
    chain: string;
    bountyId: number;
  }[];
};

export type CommentMatadata = {
  votes?: number;
  upVotes: number;
  downVotes: number;
  voters: string[];
};
