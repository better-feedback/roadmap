import Modal from "features/common/components/modal";

import type { Token } from "../types";

export default function SelectTokenModal(props: {
  isOpen: boolean;
  onSelectToken: (token: Token) => void;
  onClose: () => void;
  tokens: Token[];
}) {
  return (
    <Modal title="Select a token" onClose={props.onClose} isOpen={props.isOpen}>
      <ul>
        {props.tokens.map((token) => (
          <TokenListItem
            key={token.address}
            token={token}
            onClick={props.onSelectToken}
          />
        ))}
      </ul>
    </Modal>
  );
}

function TokenListItem(props: {
  token: Token;
  onClick: (token: Token) => void;
}) {
  return (
    <li
      className="flex flex-row items-center p-2 mt-2 rounded-lg cursor-pointer hover:bg-black hover:bg-opacity-30 text-white"
      onClick={() => props.onClick(props.token)}
    >
      <div>{props.token.symbol.toUpperCase()}</div>
    </li>
  );
}
