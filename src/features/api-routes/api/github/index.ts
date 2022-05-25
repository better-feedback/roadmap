import { Octokit } from "octokit";

import config from "../../../../config";
import { metadataCommentRegex } from "./utils";

import type { ReqParams } from "../../../common/types";

const octokit = new Octokit({ auth: config.github.pat });

export async function getIssues(
  reqParams: ReqParams & {
    labels?: string;
  }
) {
  const { perPage = 10, page = 1, labels } = reqParams;
  const { data = [] } = await octokit.rest.issues.listForRepo({
    owner: config.github.repoOwner,
    repo: config.github.repoName,
    labels,
    per_page: perPage,
    page,
  });

  return data;
}

export async function getIssueByNumber(issueNumber: number) {
  const { data } = await octokit.rest.issues.get({
    owner: config.github.repoOwner,
    repo: config.github.repoName,
    issue_number: issueNumber,
  });

  return data;
}

export async function upsertMetadataComment(params: {
  metadataCommentBody: string;
  issueNumber: number;
  metadataCommentId?: number;
}) {
  if (!params.metadataCommentId) {
    await octokit.rest.issues.createComment({
      owner: config.github.repoOwner,
      repo: config.github.repoName,
      issue_number: params.issueNumber,
      body: params.metadataCommentBody,
    });
  } else {
    await octokit.rest.issues.updateComment({
      owner: config.github.repoOwner,
      repo: config.github.repoName,
      issue_number: params.issueNumber,
      comment_id: params.metadataCommentId as number,
      body: params.metadataCommentBody,
    });
  }
  return true;
}

export async function updateMetadataComment() {}

export async function getMetadataComment(issueNumber: number) {
  const { data = [] } = await octokit.rest.issues.listComments({
    owner: config.github.repoOwner,
    repo: config.github.repoName,
    issue_number: issueNumber,
  });

  const metadataComment = data.find((comment) => {
    const match = comment.body?.match(metadataCommentRegex);
    return Boolean(match);
  });

  return metadataComment;
}
