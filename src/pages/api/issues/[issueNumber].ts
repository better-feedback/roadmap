import { getIssueDetailsHandler } from "../../../features/api-routes/handlers/issues";
import {
  ApiError,
  apiErrorHandler,
} from "../../../features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  issue?: any[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      /**
       * `GET /issues/:issueNumber`
       */
      case "GET":
        return getIssueDetailsHandler(req, res);
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
