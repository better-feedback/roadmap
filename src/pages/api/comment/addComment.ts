import {
  ApiError,
  apiErrorHandler,
} from "../../../features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

import { Octokit } from "octokit";

import {
  setMetadataComment,
  getMetadataAndCleanedComment,
  metadataCommentRegex,
} from "features/api-routes/api/github/utils";

import { getMetadataCommentId } from "features/api-routes/api/github";

type Data = {
  issue?: any[];
  error?: any;
};

import type {
  CommentMatadata,
  Metadata,
} from "features/api-routes/api/github/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      /**
       * `GET /issues/:issueNumber`
       */
      case "POST":
        const octoKit = new Octokit({ auth: process.env.GITHUB_PAT });
        if (
          !process.env.NEXT_PUBLIC_REPO_OWNER ||
          !process.env.NEXT_PUBLIC_REPO_NAME
        )
          return res.status(500).send("Missing environment variables");

        /* Destructuring the request body and then getting the metadata comment id. */
        const { issueNumber, isUpVote, walletId } = req.body;

        const { id, body } = await getMetadataCommentId(issueNumber);

        /* This is creating a new comment with the metadata if matadata doesnt exist already. */
        if (!id || !body || !body.includes("vote")) {
          const commentBody = setMetadataComment(
            `This issue has ${isUpVote ? "1" : "0"} upvotes and ${
              !isUpVote ? "1" : "0"
            } downvotes`,
            {
              // votes: isUpVote ? 1 : -1,
              upVotes: isUpVote ? 1 : 0,
              downVotes: !isUpVote ? 1 : 0,
              //Add wallet is with voting type
              voters: [`${walletId}_${isUpVote ? "up" : "down"}`],
            }
          );

          await octoKit.rest.issues.createComment({
            owner: process.env.NEXT_PUBLIC_REPO_OWNER,
            repo: process.env.NEXT_PUBLIC_REPO_NAME,
            issue_number: issueNumber,
            body: commentBody,
          });
        } /* This is updating the comment with the new vote count. */ else {
          const {
            metadata,
            cleanedComment,
          }: { metadata: CommentMatadata | any; cleanedComment: string } =
            getMetadataAndCleanedComment(body);

          let newVotes: number = metadata.votes;
          let newUpvotes: number = metadata.upVotes;
          let newDownvotes: number = metadata.downVotes;
          let newVoters: string[] = [...metadata.voters];

          //If wallet is upvoting and now downvotes, keep in voters and lower upvote by 1 and increase downVote by 1
          if (!isUpVote && metadata.voters.includes(walletId + "_up")) {
            newVoters = metadata.voters.filter(
              (voter: string) => !voter.includes(walletId)
            );
            newVoters.push(`${walletId}_down`);
            newUpvotes = metadata.upVotes - 1;
            newDownvotes = metadata.downVotes + 1;
          }

          //If wallet is downvoting and now upvotes, keep in voters and increase upvote by 1 and lower downVote by 1
          else if (isUpVote && metadata.voters.includes(walletId + "_down")) {
            newVoters = metadata.voters.filter(
              (voter: string) => !voter.includes(walletId)
            );
            newVoters.push(`${walletId}_up`);
            newUpvotes = metadata.upVotes + 1;
            newDownvotes = metadata.downVotes - 1;
          }

          //If the wallet is upvoting and presses upvote again remove from voters and decrease upvote by 1
          else if (isUpVote && metadata.voters.includes(walletId + "_up")) {
            newVoters = metadata.voters.filter(
              (voter: string) => !voter.includes(walletId)
            );
            newUpvotes = metadata.upVotes - 1;
          }

          //If the wallet is downvoting and presses downvote again remove from voters and decrease downvote by 1
          else if (!isUpVote && metadata.voters.includes(walletId + "_down")) {
            newVoters = metadata.voters.filter(
              (voter: string) => !voter.includes(walletId)
            );
            newDownvotes = metadata.downVotes - 1;
          }

          //If the wallet never voted before add to voters and increase or decrease vote by 1
          else {
            newVoters = [
              ...metadata.voters,
              `${walletId}_${isUpVote ? "up" : "down"}`,
            ];

            newUpvotes = isUpVote ? metadata.upVotes + 1 : metadata.upVotes;
            newDownvotes = !isUpVote
              ? metadata.downVotes + 1
              : metadata.downVotes;
          }

          const commentBody = setMetadataComment(
            `This issue has ${newUpvotes} upvotes and ${newDownvotes} downvotes`,
            {
              // votes: newVotes,
              upVotes: newUpvotes,
              downVotes: newDownvotes,
              voters: newVoters,
            }
          );

          await octoKit.rest.issues.updateComment({
            owner: process.env.NEXT_PUBLIC_REPO_OWNER,
            repo: process.env.NEXT_PUBLIC_REPO_NAME,
            issue_number: issueNumber,
            comment_id: id,
            body: commentBody,
          });
        }

        return res.status(200).send("Success");
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
