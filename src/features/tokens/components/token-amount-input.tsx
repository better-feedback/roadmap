import React from "react";

import Button from "features/common/components/button";
import LabeledInput from "features/common/components/labeled-input";
import SelectTokenModal from "./select-token-modal";

import { useWalletChainQuery } from "features/common/hooks/useWalletQueries";
import { useTokensQuery } from "../hooks/useTokensQueries";

import type { Token } from "../types";

export default function TokenAmountInput(props: {
  tokenValue: Token | null;
  onChangeToken: (token: Token) => void;
  amountValue: string;
  onChangeAmount: (changedAmount: string) => void;
  inputClassName?: string;
}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data: walletChain } = useWalletChainQuery();
  const { data: tokens = [], isLoading } = useTokensQuery(walletChain || "", {
    enabled: Boolean(walletChain),
  });

  function handleClickTokenButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setIsModalOpen(true);
  }

  function handleSelectToken(token: Token) {
    props.onChangeToken(token);
    setIsModalOpen(false);
  }

  return (
    <>
      <SelectTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectToken={handleSelectToken}
        tokens={tokens}
      />
      <LabeledInput label="Amount" className={props.inputClassName}>
        <div className="flex flex-row justify-between bg-gray-200 dark:bg-zinc-700 px-4 py-2 rounded-md">
          <input
            className={`bg-transparent outline-none w-full`}
            type="number"
            value={props.amountValue}
            min={0}
            onChange={(event) => props.onChangeAmount(event.target.value)}
            disabled={isLoading}
            required
          />
          <Button
            type="secondary"
            className="ml-2"
            onClick={handleClickTokenButton}
          >
            {props.tokenValue ? props.tokenValue.symbol : "Select"}
          </Button>
        </div>
      </LabeledInput>
    </>
  );
}
