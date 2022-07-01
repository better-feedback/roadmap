export const githubConfig = {
  repoOwner: process.env.NEXT_PUBLIC_REPO_OWNER || "",
  repoName: process.env.NEXT_PUBLIC_REPO_NAME || "",
  labels: {
    planned: ["planned"],
    inprogress: ["inprogress"],
    proposed: ["proposed"],
    onchain: ["onchain"],
  },

  // secret
  pat: process.env.GITHUB_PAT || "",
};

export const nearChainConfig = {
  networkId: process.env.NEXT_PUBLIC_NEAR_NETWORK_ID || "",
  walletUrl: process.env.NEXT_PUBLIC_NEAR_WALLET_URL || "",
  helperUrl: process.env.NEXT_PUBLIC_NEAR_HELPER_URL || "",
  explorerUrl: process.env.NEXT_PUBLIC_NEAR_EXPLORER_URL || "",
  apiBaseUrl: process.env.NEXT_PUBLIC_NEAR_API_BASE_URL || "",
  jsonRpcUrl: process.env.NEXT_PUBLIC_NEAR_JSON_RPC_URL || "",
  daoId: process.env.NEXT_PUBLIC_NEAR_DAO_ID || "",
};

export const siteConfig = {
  enabledChains: ["near", "evmos"],
  projectName: "Evmos Proposals",
  title: "Evmos Governance Issue Tracker",
  metaDescription: "An issue tracker for all things related to Evmos governance.",
  url: "https://tracker.evmos.vision",
  metaImg: "/card.png",
};

export const config = {
  github: githubConfig,
  chains: {
    near: nearChainConfig,
  },
  site: siteConfig,
};

export default config;
