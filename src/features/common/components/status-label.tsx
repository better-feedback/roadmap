import type { IssueType } from "features/issues/types";

export default function StatusLabel(props: { status: IssueType }) {
  return (
    <>
    <div className="flex flex-row justify-stretch w-full text-sm">
      <div className="flex rounded-l-sm border-1 w-8 text-center px-3 py-1.5 border-gray-500 bg-gray-300 text-gray-800 uppercase">
        🟢
      </div>
      <div className="flex flex-grow rounded-none border-1 px-4 py-1.5 w-2/5  border-gray-500 bg-gray-300 text-gray-800 uppercase">
        {props.status}
      </div>
      <div className="flex flex-grow rounded-r-sm border-1 px-3 py-1.5 w-1/4 border-gray-500 bg-gray-400 text-gray-800 uppercase">
        TBA
      </div>
    </div>
    {/* <div className="flex flex-row justify-stretch w-full text-sm">
        <div className="flex rounded-l-sm border-1 w-8 text-center px-3 py-1.5 border-gray-500 bg-gray-300 text-gray-800 uppercase">
          🛑
        </div>
        <div className="flex flex-grow rounded-none border-1 px-4 py-1.5 w-2/5  border-gray-500 bg-gray-300 text-gray-800 uppercase">
          Drafting
        </div>
        <div className="flex flex-grow rounded-r-sm border-1 px-3 py-1.5 w-1/4 border-gray-500 bg-gray-400 text-gray-800 uppercase">
          N/A
        </div>
      </div>    
      <div className="flex flex-row justify-stretch w-full text-sm">
        <div className="flex rounded-l-sm border-1 w-8 text-center px-3 py-1.5 border-gray-500 bg-gray-300 text-gray-800 uppercase">
          🛑
        </div>
        <div className="flex flex-grow rounded-none border-1 px-4 py-1.5 w-2/5  border-gray-500 bg-gray-300 text-gray-800 uppercase">
          Final Review
        </div>
        <div className="flex flex-grow rounded-r-sm border-1 px-3 py-1.5 w-1/4 border-gray-500 bg-gray-400 text-gray-800 uppercase">
          N/A
        </div>
      </div>
      <div className="flex flex-row justify-stretch w-full text-sm">
        <div className="flex rounded-l-sm border-1 w-8 text-center px-3 py-1.5 border-gray-500 bg-gray-300 text-gray-800 uppercase">
          🛑
        </div>
        <div className="flex flex-grow rounded-none border-1 px-4 py-1.5 w-2/5  border-gray-500 bg-gray-300 text-gray-800 uppercase">
          Onchain
        </div>
        <div className="flex flex-grow rounded-r-sm border-1 px-3 py-1.5 w-1/4 border-gray-500 bg-gray-400 text-gray-800 uppercase">
          N/A
        </div>
      </div> */}
      </>
  );
}
