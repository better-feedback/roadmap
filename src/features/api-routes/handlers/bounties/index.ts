import * as githubApi from "../../api/github";
import {
  getMetadataAndCleanedComment,
  setMetadataComment,
  buildMetadataInfoText,
} from "../../api/github/utils";
import { ApiError } from "../utils";

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * `POST /bounties`
 */
export async function postBountiesHandler(
  req: NextApiRequest,
  res: NextApiResponse<{
    message?: string;
    error?: any;
  }>
) {
  const requiredPostBodyKeys = ["issueNumber", "chain", "bountyId"];
  const postBody: {
    issueNumber: number;
    chain: string;
    bountyId: number;
  } = req.body;

  Object.keys(postBody).forEach((postBodyKey) => {
    if (!requiredPostBodyKeys.includes(postBodyKey)) {
      throw new ApiError(
        400,
        `Required POST body keys: ${requiredPostBodyKeys}`
      );
    }
  });

  const metadataComment = await githubApi.getMetadataComment(
    postBody.issueNumber
  );
  const { metadata } = getMetadataAndCleanedComment(
    metadataComment?.body || ""
  );

  const updatedMetadata = {
    ...metadata,
    bounties: [
      ...metadata.bounties,
      {
        chain: postBody.chain,
        bountyId: postBody.bountyId,
      },
    ],
  };

  const newMetadataCommentBody = setMetadataComment(
    buildMetadataInfoText(updatedMetadata),
    updatedMetadata
  );

  await githubApi.upsertMetadataComment({
    metadataCommentBody: newMetadataCommentBody,
    issueNumber: postBody.issueNumber,
    metadataCommentId: metadataComment?.id,
  });

  res.status(200).json({ message: "OK" });
}
