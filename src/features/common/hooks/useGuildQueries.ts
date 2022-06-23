import { guild } from "@guildxyz/sdk";
import axios from "axios";
import { Issue } from "features/issues/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { nearAccountToHex } from "utils/helpers";
import { chainsToApi } from "../constants";

/*
 * It checks if the user has access to vote or not
 * @returns A boolean value
 */
export function useVotingAccessQuery() {
  const walletChain = window.localStorage.getItem("wallet-chain");

  return useQuery("hasVotingAccess", async () => {
    if (!walletChain) {
      return null;
    }
    const { getAccountId } = chainsToApi[walletChain];

    return getAccountId().then(async (accountId) => {
      const account = nearAccountToHex([accountId]);

      //Getting guild roles data
      const guildData = await guild.getUserAccess(
        parseInt(process.env.NEXT_PUBLIC_GUILD_ID),
        account[0]
      );

      //Getting role id by chain
      const roleId: string =
        walletChain === "near"
          ? process.env.NEXT_PUBLIC_NEAR_ROLE_ID
          : process.env.NEXT_PUBLIC_ROLE_ID;

      let canVote: boolean = false;

      //Checking if user has access to vote or not
      guildData.forEach((access) => {
        if (access.roleId === parseInt(roleId)) {
          canVote = access.access;
        }
      });
      return canVote;
    });
  });
}

export const getVoteCount = async (issueNumber: number) => {
  const result = await axios.get(
    `/api/comment/getVoteCount?issueNumber=${issueNumber}`
  );
  return result.data;
};

/*
 * It returns the number of votes for a given issue
 * @param {number} issueNumber - The issue number of the issue we want to get the vote count for.
 * @returns The result of the query.
 */
export function useIssueVoteCount(issueNumber: number) {
  return useQuery(["issueVoteCount", issueNumber], async () => {
    /* Making a request to the backend to get the vote count for a given issue. */
    return getVoteCount(issueNumber);
  });
}

export function useVote() {
  const queryClient = useQueryClient();

  const addVoteMutation = useMutation(
    async (params: {
      issueNumber: number;
      isUpVote: boolean;
      walletId: string;
    }) => {
      const result = await axios.post("/api/comment/addComment", {
        issueNumber: params.issueNumber,
        isUpVote: params.isUpVote,
        walletId: params.walletId,
      });
      return result.data;
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([
          "issueVoteCount",
          variables.issueNumber,
        ]);
      },
    }
  );

  return addVoteMutation;
}
