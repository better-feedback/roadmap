import Modal from "./modal";
import ChainListItem from "./chain-list-item";

export default function SelectChainModal(props: {
  isOpen: boolean;
  onSelectChain: (chain: string) => void;
  onClose: () => void;
  enabledChains: string[];
}) {
  return (
    <Modal title="Select a chain" onClose={props.onClose} isOpen={props.isOpen}>
      <ul>
        {props.enabledChains.map((chain) => (
          <ChainListItem
            key={chain}
            chainName={chain}
            onClick={props.onSelectChain}
          />
        ))}
      </ul>
    </Modal>
  );
}
