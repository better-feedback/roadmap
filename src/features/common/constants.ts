import * as nearApi from "features/near/api";

import type { ChainApi } from "./types";

export const chains = {
  NEAR: "near",
};

export const chainsToApi: {
  [chain: string]: ChainApi;
} = {
  [chains.NEAR]: {
    // Wallet API
    signIn: nearApi.signIn,
    signOut: nearApi.signOut,
    isSignedIn: nearApi.isSignedIn,
    getAccountId: nearApi.getAccountId,
    // Contract API
    addBounty: nearApi.addBounty,
    claimBounty: nearApi.claimBounty,
    doneBounty: nearApi.doneBounty,
    giveUpBounty: nearApi.giveUpBounty,
    getBountyById: nearApi.getBountyById,
    // Tokens API
    getTokens: nearApi.getTokens,
  },
};
