import ChainIcon from "features/common/components/chain-icon";

import { siteConfig } from "config";

import type { Metadata } from "../types";

export default function ListItemMetadata(props: { metadata: Metadata }) {
  return (
    <div className="flex flex-row items-center">
      {siteConfig.enabledChains.map((chain) => {
        const numBounties = props.metadata.bounties.filter(
          (bounty) => bounty.chain === chain
        ).length;

        if (!numBounties) {
          return null;
        }

        return (
          <div key={chain} className="hover:text-black">
            <ChainIcon
              chainName={chain}
              size={16}
              className="dark:fill-current dark:text-white"
            />
            <div className="text-xs text-center font-bold">{numBounties}</div>
          </div>
        );
      })}
    </div>
  );
}
