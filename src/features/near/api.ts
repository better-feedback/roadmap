import * as nearApi from "near-api-js";

import { nearChainConfig } from "config";

import type { Token } from "features/tokens/types";

export async function initNearWalletConnection() {
  const near = await nearApi.connect({
    networkId: nearChainConfig.networkId,
    keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: nearChainConfig.jsonRpcUrl,
    walletUrl: nearChainConfig.walletUrl,
    helperUrl: nearChainConfig.helperUrl,
  });
  return new nearApi.WalletConnection(near, null);
}

export async function signIn() {
  const nearWalletConnection = await initNearWalletConnection();

  return nearWalletConnection.requestSignIn({
    contractId: nearChainConfig.daoId,
  });
}

export async function isSignedIn() {
  const nearWalletConnection = await initNearWalletConnection();
  let bool = await nearWalletConnection.isSignedIn();
  return bool;
}

export async function returnWallet() {
  const nearWalletConnection = await initNearWalletConnection();
  return nearWalletConnection;
}

export async function signOut() {
  const nearWalletConnection = await initNearWalletConnection();

  return nearWalletConnection.signOut();
}

export async function getAccountId(): Promise<string> {
  const nearWalletConnection = await initNearWalletConnection();

  return nearWalletConnection.getAccountId();
}

export async function initDaoContract() {
  const nearWalletConnection = await initNearWalletConnection();
  const account = nearWalletConnection.account();

  return new nearApi.Contract(account, nearChainConfig.daoId, {
    viewMethods: ["getMessages"],
    changeMethods: ["add_proposal"],
  });
}

//Function for view methods
export const viewFunction = async (functionName: string, args = {}) => {
  const nearWalletConnection = await initNearWalletConnection();
  const result = await nearWalletConnection
    .account()
    .viewFunction(nearChainConfig.daoId, functionName, args);

  return result;
};

//Function for call method
export const callFunction = async (
  functionName: string,
  args = {},
  deposit = "0"
) => {
  const nearWalletConnection = await initNearWalletConnection();
  const result = await nearWalletConnection.account().functionCall({
    contractId: nearChainConfig.daoId,
    methodName: functionName,
    args: args,
    attachedDeposit: nearApi.utils.format.parseNearAmount(deposit),
  });
  return result;
};

export async function addBounty(params: {
  issueNumber: number;
  amount: number;
  maxDeadline: number;
}) {
  callFunction(
    "fundBounty",
    { issueId: params.issueNumber, deadline: params.maxDeadline.toString() },
    params.amount.toString()
  )
    .then((response) => {})
    .catch((error) => {
      console.log("Fund Error", error);
    });
}

export async function claimBounty() {
  // TODO
}

export async function doneBounty() {
  // TODO
}

export async function giveUpBounty() {
  // TODO
}

export async function getBountyById(bountyId: number) {
  // TODO
}

export async function getTokens(): Promise<Token[]> {
  return [
    {
      symbol: "NEAR",
      address: "0x",
      decimals: 18,
      name: "Near Token",
    },
  ];
}
