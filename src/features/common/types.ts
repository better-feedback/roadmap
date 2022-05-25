import type { BountyParams } from "features/bounties/types";
import type { Token } from "features/tokens/types";

export type ReqParams = {
  perPage?: any;
  page?: any;
};

export type ChainApi = {
  // Wallet API
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isSignedIn: () => Promise<boolean>;
  getAccountId: () => Promise<string>;
  // Contract API
  addBounty: (bounty: BountyParams) => Promise<string>;
  claimBounty: (bountyId: number) => Promise<void>;
  doneBounty: (bountyId: number) => Promise<void>;
  giveUpBounty: (bountyId: number) => Promise<void>;
  getBountyById: (bountyId: number) => Promise<any>;
  // Tokens API
  getTokens: () => Promise<Token[]>;
};
