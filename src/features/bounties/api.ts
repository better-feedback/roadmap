import axios from "axios";

export async function addBountyToMetadataComment(
  issueNumber: number,
  bountyMetadata: {
    chain: string;
    bountyId: number;
  }
) {
  return axios.post<any>(`/api/bounties`, {
    issueNumber,
    chain: bountyMetadata.chain,
    bountyId: bountyMetadata.bountyId,
  });
}
