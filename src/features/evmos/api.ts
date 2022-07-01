import * as wagmi from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected'
import type { Token } from "features/tokens/types";

export async function initWalletConnection() {
  return new InjectedConnector();
}

export async function signIn() {
  const wagmiClient = await initWalletConnection();
  return wagmiClient.getAccount()
}

export async function isSignedIn() {
  const wagmiClient = await initWalletConnection();
  let bool = await wagmiClient.isAuthorized();
  return bool;
}

export async function returnWallet() {
  const wagmiClient = await initWalletConnection();
  return wagmiClient;
}

export async function signOut() {
  const wagmiClient = await initWalletConnection();

  return wagmiClient.disconnect();
}

export async function getAccountId(): Promise<string> {
  const wagmiClient = await initWalletConnection();

  return wagmiClient.getAccount();
}

// export async function initDaoContract() {
//   const wagmiClient = await initWalletConnection();
//   const account = wagmiClient.account();

//   return new wagmi.Contract(account, nearChainConfig.daoId, {
//     viewMethods: ["getMessages"],
//     changeMethods: ["add_proposal"],
//   });
// }

//Function for view methods
// export const viewFunction = async (functionName: string, args = {}) => {
//   const wagmiClient = await initWalletConnection();
//   const result = await wagmiClient
//     .account()
//     .viewFunction(nearChainConfig.daoId, functionName, args);

//   return result;
// };

//Function for call method
// export const callFunction = async (
//   functionName: string,
//   args = {},
//   deposit = "0"
// ) => {
//   const wagmiClient = await initWalletConnection();
//   const result = await wagmiClient.account().functionCall({
//     contractId: nearChainConfig.daoId,
//     methodName: functionName,
//     args: args,
//     attachedDeposit: wagmi.utils.format.parseNearAmount(deposit),
//   });
//   return result;
// };

export async function addBounty() {
  // TODO
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
      symbol: "EVMOS",
      address: "0x",
      decimals: 18,
      name: "EVMOS",
    },
  ];
}
