import type { Issue } from "../types";

export default function IssueDetailsHeading(props: { issue: Issue }) {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">
          {props.issue.title}{" "}
          <span className="text-gray-500 dark:text-zinc-500">
            #{props.issue.number}
          </span>
        </h1>
        <a
          href={props.issue.html_url}
          target="_blank"
          rel="noreferrer"
          className="underline cursor-pointer decoration-pink-500"
        >
          View on GitHub
        </a>
      </div>
      <div className="border-b-2 text-gray-500 border-gray-100 py-4 mb-4 dark:text-zinc-500 dark:border-zinc-800 ">
        {props.issue.user.login} opened this issue on {props.issue.created_at}
      </div>
    </div>
  );
}
