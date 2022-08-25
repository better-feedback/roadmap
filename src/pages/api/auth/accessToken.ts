import { ApiError, apiErrorHandler } from "features/api-routes/handlers/utils";

import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    var options = {
      method: "POST",
      url: "https://dev-qixk1-qm.us.auth0.com/oauth/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_API_IDENTIFIER,
      }),
    };

    const response = await axios.request(options);

    res.status(200).json(response.data);

  } catch (error) {
    apiErrorHandler(res, error);
  }
}
