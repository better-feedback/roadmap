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
    const { id, issueNumber, isGitAuthed, walletId } = req.body;

    const response = isGitAuthed ? ((await getUserAccessKey(id)) as any) : null;

    const accessToken = isGitAuthed
      ? response?.identities[0].access_token
      : process.env.GITHUB_PAT;

    const octoKit = new Octokit({
      auth: accessToken,
    });

    const bodyMesage = isGitAuthed
      ? `${response.name} has started working on this issue`
      : `@${walletId} has started working on this issue`;

    await octoKit.rest.issues.createComment({
      owner: process.env.NEXT_PUBLIC_REPO_OWNER as string,
      repo: process.env.NEXT_PUBLIC_REPO_NAME as string,
      issue_number: issueNumber,
      body: bodyMesage,
    });

    res.status(200).json({ message: "Comment added" });
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
