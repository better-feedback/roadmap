import Link from "next/link";

import ListItemMetadata from "./list-item-metadata";

import type { Issue } from "../types";

type Props = {
  issue: Issue;
};

export function IssuesListItem(props: Props) {
  const { issue } = props;

  return (
    <li className="py-2 px-4 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer">
      <Link passHref href={`/issues/${issue.number}`}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-semibold">{issue.title}</h3>
            <div className="text-xs">
              {`#${issue.number} opened on ${issue.created_at} by ${issue.user.login}`}
            </div>
          </div>

          <ListItemMetadata metadata={issue.metadata} />
        </div>
      </Link>
    </li>
  );
}
