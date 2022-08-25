import axios from "axios";

import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export const getUserAccessKey = async (
  userId: string,
) => {
  try {
    const adminAccessKey = (await getAdminAccessKey()) as any;

    var options = {
      method: "GET",
      url: `${process.env.AUTH0_API_IDENTIFIER}users/${userId}?fields=identities,name`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${adminAccessKey.access_token}`,
      },
    };

    const response = await axios.request(options as any);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const getAdminAccessKey = async () => {
  try {
    var options = {
      method: "POST",
      url: "https://dev-qixk1-qm.us.auth0.com/oauth/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_CLIENT_ID as string,
        client_secret: process.env.AUTH0_CLIENT_SECRET as string,
        audience: process.env.AUTH0_API_IDENTIFIER as string,
      }),
    };

    const response = await axios.request(options as any);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
