import { useMutation, useQuery, useQueryClient } from "react-query";

import { chainsToApi } from "../constants";

export function useWalletChainQuery() {
  return useQuery(["wallet", "chain"], () => {
    const walletChain = window.localStorage.getItem("wallet-chain");
    return walletChain;
  });
}

export function useWalletIsSignedInQuery() {
  return useQuery(["wallet", "isSignedIn"], () => {
    const walletChain = window.localStorage.getItem("wallet-chain");

    if (!walletChain) {
      return false;
    }

    const { isSignedIn } = chainsToApi[walletChain];
    return isSignedIn();
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

  const walletSignInMutation = useMutation(
    async (walletChain: string) => {
      const { signIn } = chainsToApi[walletChain];

      await signIn();
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
