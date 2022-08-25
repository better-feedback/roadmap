import type { IssueType } from "./types";

export const issueTypes: Record<"OPEN" | "IN_PROGRESS" | "LIVE" | "EXPIRED", IssueType> =
  {
    OPEN: "open",
    IN_PROGRESS: "inProgress",
    LIVE: "live",
    EXPIRED : "expired"
  };
