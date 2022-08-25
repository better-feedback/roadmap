import * as BetterBountyV2 from "./BetterBountyV2.json"

export const contractConfig = {
    addressOrName: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
    contractInterface: BetterBountyV2.abi,
}