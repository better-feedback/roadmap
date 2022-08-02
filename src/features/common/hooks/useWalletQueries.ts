import { useMutation, useQuery, useQueryClient } from "react-query";

import { chainsToApi } from "../constants";

import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";

export function useWalletChainQuery() {
  return useQuery(["wallet", "chain"], () => {
    const walletChain = window.localStorage.getItem("wallet-chain");
    return walletChain;
  });
}

export function useWalletIsSignedInQuery() {
  const { isConnected } = useAccount();

  return useQuery(["wallet", "isSignedIn"], () => {
    const walletChain = window.localStorage.getItem("wallet-chain");

    if (!walletChain) {
      return false;
    }

    const { isSignedIn } =
      walletChain === "near"
        ? chainsToApi[walletChain]
        : { isSignedIn: () => {} };
    return walletChain === "near" ? isSignedIn() : isConnected;
  });
}

export function useWalletSignedInAccountQuery() {
  return useQuery(["wallet", "signedInAccount"], () => {
    const walletChain = window.localStorage.getItem("wallet-chain");

    if (!walletChain) {
      return null;
    }

    const { getAccountId } = chainsToApi[walletChain];
    return getAccountId();
  });
}

export function useWalletSignInMutation() {
  const queryClient = useQueryClient();
  const { openConnectModal } = useConnectModal();

  const walletSignInMutation = useMutation(
    async (walletChain: string) => {
      if (walletChain === "near") {
        const { signIn } = chainsToApi[walletChain];

        await signIn();
      } else {
        if (openConnectModal) {
          openConnectModal();
        }
      }
      window.localStorage.setItem("wallet-chain", walletChain);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["wallet", "chain"]);
      },
    }
  );

  return walletSignInMutation;
}

export function useWalletSignOutMutation() {
  const queryClient = useQueryClient();

  const walletSignOutMutation = useMutation(
    async () => {
      const walletChain = window.localStorage.getItem("wallet-chain");

      if (!walletChain) {
        return null;
      }

      const { signOut } = chainsToApi[walletChain];
      await signOut();
      window.localStorage.removeItem("wallet-chain");
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["wallet", "chain"]);
      },
    }
  );

  return walletSignOutMutation;
}
