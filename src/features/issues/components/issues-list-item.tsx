import Link from "next/link";

import ListItemMetadata from "./list-item-metadata";

import type { Issue, Label } from "../types";

type Props = {
  issue: Issue;
};

export function IssuesListItem(props: Props) {
  const { issue } = props;
  return (
    <li className="py-2 px-4 dark:hover:bg-zinc-800 hover:bg-gray-200 cursor-pointer overlow">
      <Link passHref href={`/issues/${issue.number}`}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-semibold">{issue.title}</h3>
            <div className="text-xs">
              {`#${issue.number} opened on ${issue.created_at} by ${issue.user.login}`}
            </div>
            <div className="flex gap-2 flex-wrap mt-1">
              {issue?.labels.map((label: Label) => {

                return (
                  <div
                    key={label.id}
                    className={`inline-flex items-center justify-center px-2 border-2 border-zinc-800 rounded-md bg-transparent text-gray-500`}
                  >
                    <span className={`text-sm`}>{label.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <ListItemMetadata metadata={issue.metadata} />
        </div>
      </Link>
    </li>
  );
}
