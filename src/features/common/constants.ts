import * as evmosApi from "features/evmos/api";

import type { ChainApi } from "./types";

export const chains = {
  EVMOS: "evmos"
};

export const chainsToApi: {
  [chain: string]: ChainApi;
} = {
  [chains.EVMOS]: {
    // Wallet API
    signIn: evmosApi.signIn,
    signOut: evmosApi.signOut,
    isSignedIn: evmosApi.isSignedIn,
    getAccountId: evmosApi.getAccountId,
    // Contract API
    addBounty: evmosApi.addBounty,
    claimBounty: evmosApi.claimBounty,
    doneBounty: evmosApi.doneBounty,
    giveUpBounty: evmosApi.giveUpBounty,
    getBountyById: evmosApi.getBountyById,
    // Tokens API
    getTokens: evmosApi.getTokens,
  },
};
