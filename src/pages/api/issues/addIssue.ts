import {
  ApiError,
  apiErrorHandler,
} from "../../../features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

import { getUserAccessKey } from "../../../features/api-routes/api/helpers/authProfile";

import { Octokit } from "octokit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, title, body, isGithubAuth } = req.body;

    const accessToken = (isGithubAuth
      ? await getUserAccessKey(userId)
      : process.env.GITHUB_PAT) as any;

    const octokit = new Octokit({
      auth: !isGithubAuth ? accessToken : accessToken?.identities[0].access_token ,
    });

    

    const newIssue = await octokit.rest.issues.create({
      owner: process.env.NEXT_PUBLIC_REPO_OWNER as string,
      repo: process.env.NEXT_PUBLIC_REPO_NAME as string,
      title,
      body : isGithubAuth ? body : `**Created By: ${userId}**\n ${body}`,
    });

    res.status(200).json({ message: newIssue.data });
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
