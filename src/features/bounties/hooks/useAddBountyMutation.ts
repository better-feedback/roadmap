import { useMutation, useQueryClient } from "react-query";

import { chainsToApi } from "features/common/constants";
import { addBountyToMetadataComment } from "../api";

export default function useAddBountyMutation() {
  const queryClient = useQueryClient();

  const addBountyMutation = useMutation(
    async (params: {
      issueNumber: number;
      chain: string;
      issueDescription: string;
      token: string;
      amount: string;
      maxDeadline: number;
    }) => {
      const { addBounty } = chainsToApi[params.chain];

      const bountyId = await addBounty(params);
      await addBountyToMetadataComment(params.issueNumber, {
        chain: params.chain,
        bountyId,
      });
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["issues", variables.issueNumber]);
      },
    }
  );
  return addBountyMutation;
}
