import type { NextApiRequest, NextApiResponse } from "next";

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function apiErrorHandler(res: NextApiResponse, error: any) {
  const { statusCode = 0, message } = error;

  console.error(error);

  if (statusCode === 500 || statusCode === 0) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  return res.status(statusCode).json({ error: message });
}
