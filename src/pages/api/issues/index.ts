import { getIssuesListHandler } from "../../../features/api-routes/handlers/issues";
import {
  ApiError,
  apiErrorHandler,
} from "../../../features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  issues?: any[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      /**
       * `GET /issues?page=1&perPage=10`
       */
      case "GET":
        return getIssuesListHandler(req, res);
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
