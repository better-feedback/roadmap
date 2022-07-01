import { parseDate } from "utils/helpers";
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
        <a className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-gray-600 rounded group active:bg-gray-500 focus:outline-none focus:ring" href={props.issue.html_url} target="_blank" rel="noreferrer">
  <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </span>

  <span className="text-sm font-medium transition-all group-hover:mr-4">
  View Source
  </span>
</a>
       
      </div>
      <div className="border-b-2 text-gray-300 border-gray-500 border-opacity-25 py-2 mb-4 dark:text-zinc-500 dark:border-zinc-800 ">
      </div>
    </div>
  );
}
