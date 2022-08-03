import React, { useEffect } from "react";

import FormInput from "features/common/components/form-input";
import LabeledInput from "features/common/components/labeled-input";
import ChainIcon from "features/common/components/chain-icon";
import TokenAmountInput from "features/tokens/components/token-amount-input";
import Button from "features/common/components/button";

import { useIssueDetailsQuery } from "features/issues/hooks/useIssuesQueries";
import { useWalletChainQuery } from "features/common/hooks/useWalletQueries";
import useAddBountyMutation from "../hooks/useAddBountyMutation";
import { viewFunction } from "features/near/api";
import { useRouter } from "next/router";

import type { Token } from "features/tokens/types";
import { ethers } from "ethers";
import { useContractWrite, useAccount, useContractRead } from "wagmi";

import { contractConfig } from "utils/solidity/defaultConfig";

import { parseDate } from "utils/helpers";


export default function AddBounty(props: { issueNumber: number }) {
  const [token, setToken] = React.useState<Token | null>(null);
  const [amount, setAmount] = React.useState("");
  const [maxDeadline, setMaxDeadline] = React.useState("");
  const [areInputsValid, setAreInputsValid] = React.useState(false);
  const [doesBountyExist, setDoesBountyExist] = React.useState(false);

  const [isCreationLoading, setIsCreationLoading] = React.useState(false);
  const [isLoadingSigner, setIsLoadingSigner] = React.useState(false);

  const { data: issue, isLoading } = useIssueDetailsQuery(props.issueNumber);
  const { data: walletChain = "" } = useWalletChainQuery();
  const addBountyMutation = useAddBountyMutation();
  const router = useRouter();
  const account = useAccount();





  const { data, isError, isLoading: writing, write } = useContractWrite({
    ...contractConfig,
    functionName: 'fundBounty',
    args: [issue?.url, maxDeadline
      ? new Date(new Date(maxDeadline).setUTCHours(23, 59, 59, 59)).getTime().toString()
      : "0"],
    overrides: {
      value: ethers.utils.parseEther(amount ? amount : "0"),
    },
    onError: (error) => {
      setIsCreationLoading(false)
      alert(error)

    },
    onSuccess: () => {
      setIsCreationLoading(false)

      router.replace(`/issues/${issue?.number}`);
    }
  })


  const bountyPolygon = useContractRead({
    ...contractConfig,
    functionName: "getBountyById",
    args: issue?.url,
    watch: true,
  });








  useEffect(() => {
    let issueNumber = window.location.pathname.split("/")[2];
    if (!walletChain) {
      router.replace(`/issues/${issueNumber}`);
    }
  }, [walletChain]);




  function handleChangeMaxDeadline(event: React.ChangeEvent<HTMLInputElement>) {
    setMaxDeadline(event.target.value);
  }

  function handleClickAddBounty(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (!issue || !walletChain || !token || !amount) {
      return setAreInputsValid(false);
    }


    if (walletChain === "near") {
      localStorage.setItem("isBountyAdded", "true");

      addBountyMutation.mutate({
        issueNumber: issue.url,
        issueDescription: "byebye",
        chain: walletChain,
        token: token.address,
        maxDeadline: maxDeadline
          ? new Date(new Date(maxDeadline).setUTCHours(23, 59, 59, 59)).getTime()
          : 0,
        amount,
      });
    } else {
      write();
    }

  }

  useEffect(() => {
    const isBountyAdded = localStorage.getItem("isBountyAdded");
    if (isBountyAdded === "true") {
      localStorage.removeItem("isBountyAdded");
      router.replace(`/issues/${props.issueNumber}`);
    }
  }, []);

  useEffect(() => {
    /* Checking if the issue exists. */
    if (!issue) return;

    /* Getting bounty details for the issue */
    viewFunction("getBountyByIssue", { issueId: issue?.url })
      .then((res) => {
        setDoesBountyExist(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [issue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!issue) {
    return <div>Not found</div>;
  }



  const showDatePicker = () => {
    return walletChain === "near" ? !doesBountyExist : bountyPolygon?.data?.id === ""
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold">Add bounty</h1>
      <form className="grid grid-cols-4 gap-2 mt-4">
        <LabeledInput label="Chain">
          <div className="flex flex-row items-center">
            <ChainIcon
              chainName={walletChain || ""}
              size={18}
              className="dark:fill-current dark:text-white mr-2"
            />
            {walletChain?.toUpperCase()}
          </div>
        </LabeledInput>
        <LabeledInput label="GitHub issue">
          <div>#{issue.number}</div>
        </LabeledInput>
        <LabeledInput label="Status">
          <div>{walletChain === "near" ? (!doesBountyExist ? "NOBOUNTY" : "OPEN") : (bountyPolygon?.data?.id === "" ? "NOBOUNTY" : "OPEN")}</div>
        </LabeledInput>
        <LabeledInput label="Deadline">
          <div>{walletChain === "near" ? (!doesBountyExist ? "-" : parseDate(doesBountyExist?.deadline)) : (bountyPolygon?.data?.id === "" ? "-" : parseDate(bountyPolygon?.data?.deadline))}</div>
        </LabeledInput>
        {showDatePicker() && (
          <LabeledInput label="Max. deadline" className="col-span-4">
            <FormInput
              type="date"
              value={maxDeadline}
              min={0}
              onChange={handleChangeMaxDeadline}
              className="w-full"
              required
            />
          </LabeledInput>
        )}

        <TokenAmountInput
          inputClassName="col-span-4"
          onChangeToken={setToken}
          tokenValue={token}
          onChangeAmount={setAmount}
          amountValue={amount}
        />
        <Button
          className="w-full col-span-4 mt-4"
          onClick={handleClickAddBounty}
          disabled={addBountyMutation.isLoading}
        >
          {addBountyMutation.isLoading || writing
            ? "Creating bounty..."
            : doesBountyExist || bountyPolygon?.data?.id !== ""
              ? "Fund Bounty"
              : "Create bounty"}
        </Button>
      </form>
    </div>
  );
}
