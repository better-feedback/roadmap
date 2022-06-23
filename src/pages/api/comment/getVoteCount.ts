import {
  ApiError,
  apiErrorHandler,
} from "../../../features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

import { Octokit } from "octokit";

import {
  setMetadataComment,
  getMetadataAndCleanedComment,
} from "features/api-routes/api/github/utils";

import { getMetadataCommentId } from "features/api-routes/api/github";

type Data = {
  issue?: any[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        if (
          !process.env.NEXT_PUBLIC_REPO_OWNER ||
          !process.env.NEXT_PUBLIC_REPO_NAME
        )
          return res.status(500).send("Missing environment variables");

        /* Getting the issue number from the query string and then getting the metadata comment id from
       the issue number. */
        const { issueNumber } = req.query;

        if (!issueNumber) return res.status(400).send("Missing issue number");

        const { id, body } = await getMetadataCommentId(parseInt(issueNumber));

        if (!body || !body.includes("vote"))
          return res.status(200).json({ votes: 0 });

        /* Destructuring the metadata and cleanedComment from the getMetadataAndCleanedComment function. */
        const { metadata, cleanedComment } = getMetadataAndCleanedComment(body);

        return res
          .status(200)
          .json(metadata?.votes ? metadata : { votes: 0, voters: [] });
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
