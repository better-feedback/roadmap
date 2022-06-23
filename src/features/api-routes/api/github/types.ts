export type Metadata = {
  bounties: {
    chain: string;
    bountyId: number;
  }[];
};

export type CommentMatadata = {
  votes : number;
  voters: string[]
}
