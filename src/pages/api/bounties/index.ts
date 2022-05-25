import { postBountiesHandler } from "features/api-routes/handlers/bounties";
import { ApiError, apiErrorHandler } from "features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      /**
       * `POST /bounties`
       */
      case "POST":
        return postBountiesHandler(req, res);
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`);
    }
  } catch (error) {
    apiErrorHandler(res, error);
  }
}
