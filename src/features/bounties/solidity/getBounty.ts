import * as betterBounty from "../../../utils/solidity/BetterBounty.json";
import { useContractRead } from "wagmi";

export default async function getBounty(bountyId: string) {
  const chain = localStorage.getItem("wallet-chain");
  if (chain === "near") return;

  const bounty = await useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
    contractInterface: betterBounty.abi,
    functionName: "getBountyById",
    args: bountyId,
  });


}
