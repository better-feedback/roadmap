import type { IssueType } from "./types";

export const issueTypes: Record<"PLANNED" | "INPROGRESS" | "PROPOSED" | "ONCHAIN", IssueType> =
  {
    PLANNED: "planned",
    INPROGRESS: "inprogress",
    PROPOSED: "proposed",
    ONCHAIN: "onchain",
  };
