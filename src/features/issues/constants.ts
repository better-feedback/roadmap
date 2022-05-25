import type { IssueType } from "./types";

export const issueTypes: Record<"OPEN" | "PLANNED" | "IN_PROGRESS", IssueType> =
  {
    OPEN: "open",
    PLANNED: "planned",
    IN_PROGRESS: "inProgress",
  };
