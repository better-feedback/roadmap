import type { IssueType } from "features/issues/types";

export default function StatusLabel(props: { status: IssueType }) {
  return (
    <div className="flex">
      <div className="rounded-full border-2 px-2 border-pink-500 text-pink-500">
        {props.status}
      </div>
    </div>
  );
}
