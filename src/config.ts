export const githubConfig = {
  repoOwner: process.env.NEXT_PUBLIC_REPO_OWNER || "",
  repoName: process.env.NEXT_PUBLIC_REPO_NAME || "",
  labels: {
    open: "bug",
    planned: "planned",
    inProgress: "in progress",
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
  enabledChains: ["near"],
  projectName: "Better",
  title: "Better",
  externalLinks: {
    homepage: "",
    docs: "",
  },
};

export const config = {
  github: githubConfig,
  chains: {
    near: nearChainConfig,
  },
  site: siteConfig,
};

export default config;
