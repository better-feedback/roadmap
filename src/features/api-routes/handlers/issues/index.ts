import * as githubApi from "../../api/github";
import { getMetadataAndCleanedComment } from "../../api/github/utils";
import { ApiError, apiErrorHandler } from "../utils";

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * `GET /issues`
 */
export async function getIssuesListHandler(
  req: NextApiRequest,
  res: NextApiResponse<{
    issues?: any[];
    error?: any;
  }>
) {
  try {
    if (req.method !== "GET") {
      throw new ApiError(400, `Method ${req.method} not allowed`);
    }

    const githubIssues = await githubApi.getIssues({
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 10,
      labels: Array.isArray(req.query.labels)
        ? req.query.labels.join(",")
        : req.query.labels,
    });

    const githubIssuesWithMetadataComment = await Promise.all(
      githubIssues.map(async (issue) => {
        const metadataComment = await githubApi.getMetadataComment(
          issue.number
        );
        return {
          ...issue,
          metadataComment,
        };
      })
    );

    const githubIssuesWithParsedMetadata = githubIssuesWithMetadataComment.map(
      (issueWithMetadataComment) => {
        const { metadata } = getMetadataAndCleanedComment(
          issueWithMetadataComment.metadataComment?.body || ""
        );
        return {
          ...issueWithMetadataComment,
          metadata,
        };
      }
    );

    return res.status(200).json({ issues: githubIssuesWithParsedMetadata });
  } catch (error) {
    apiErrorHandler(res, error);
  }
}

/**
 * `GET /issues/:issueId`
 */
export async function getIssueDetailsHandler(
  req: NextApiRequest,
  res: NextApiResponse<{
    issue?: any;
    error?: any;
  }>
) {
  try {
    if (req.method !== "GET") {
      throw new ApiError(400, `Method ${req.method} not allowed`);
    }

    const githubIssue = await githubApi.getIssueByNumber(
      Number(req.query.issueNumber as string)
    );
    const metadataComment = await githubApi.getMetadataComment(
      githubIssue.number
    );
    const { metadata, cleanedComment } = getMetadataAndCleanedComment(
      metadataComment ? metadataComment?.body || "" : ""
    );

    return res.status(200).json({
      issue: {
        ...githubIssue,
        metadataComment,
        cleanedComment,
        metadata,
      },
    });
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
