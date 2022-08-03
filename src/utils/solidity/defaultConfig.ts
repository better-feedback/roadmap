import * as betterBounty from "./BetterBounty.json"

export const contractConfig = {
    addressOrName: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
    contractInterface: betterBounty.abi,
}