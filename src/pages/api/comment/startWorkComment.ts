import {
  ApiError,
  apiErrorHandler,
} from "../../../features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

import { getUserAccessKey } from "../../../features/api-routes/api/helpers/authProfile";

import { Octokit } from "octokit";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, issueNumber } = req.body;

    const response = (await getUserAccessKey(id)) as any;

    const accessToken = response?.identities[0].access_token;

    res.status(200).json(response);

    const octoKit = new Octokit({
      auth: accessToken,
    });

    await octoKit.rest.issues.createComment({
      owner: process.env.NEXT_PUBLIC_REPO_OWNER as string,
      repo: process.env.NEXT_PUBLIC_REPO_NAME as string,
      issue_number: issueNumber,
      body: `${response.name} has started working on this issue`,
    });

    res.status(200).json({ message: "Comment added" });
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
