import * as betterBounty from "../../../utils/solidity/BetterBounty.json";
import { useContractRead } from "wagmi";

export function useGetBounty(bountyId: string) {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
    contractInterface: betterBounty.abi,
    functionName: "getBountyById",
    args: [bountyId],
  });

  return { data, isError, isLoading };
}

export function getBounty(bountyId: string) {
  const chain = localStorage.getItem("wallet-chain");
  if (chain === "near") return null;

  // This function can't directly use the hook, but it can be used to prepare data for the hook
  return {
    addressOrName: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
    contractInterface: betterBounty.abi,
    functionName: "getBountyById",
    args: [bountyId],
  };
}