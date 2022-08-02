import Image from "next/image";

import ChainIcon from "./chain-icon";

export default function ChainListItem(props: {
  chainName: string;
  onClick: (chainName: string) => void;
}) {
  return (
    <li
      className="flex flex-row items-center p-2 mt-2 rounded-lg cursor-pointer hover:bg-black hover:bg-opacity-30 text-white"
      onClick={() => props.onClick(props.chainName)}
    >
      <ChainIcon
        chainName={props.chainName}
        className="dark:fill-current dark:text-white"
      />
      <div className="ml-4">{props.chainName.toUpperCase()}</div>
    </li>
  );
}
