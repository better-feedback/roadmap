import { ethers } from "ethers";
// import { useQuery } from "react-query";
import { useContractRead } from "wagmi";
import * as betterBounty from "../../../utils/solidity/BetterBounty.json";

export function useGetBountyQuery() {
  return useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
    contractInterface: betterBounty.abi,
    functionName: "bountyCount",
  });
}

// const { data, isError, isLoading } = useContractRead({
//   addressOrName: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
//   contractInterface: betterBounty.abi,
//   functionName: "bountyCount",
// });
