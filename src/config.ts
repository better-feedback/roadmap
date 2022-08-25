export const githubConfig = {
  repoOwner: process.env.NEXT_PUBLIC_REPO_OWNER || "",
  repoName: process.env.NEXT_PUBLIC_REPO_NAME || "",
  labels: {
    open: ["open"],
    inProgress: ["inProgress"],
    live: ["live"],
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
  enabledChains: ["near" , "polygon"],
  projectName: "Better",
  title: "Better Roadmap",
  metaDescription: "Better Roadmap",
  url: "https://roadmap.betterhq.org/",
  metaImg: "https://raw.githubusercontent.com/better-feedback/better-app/1926cf0a2327e629128f65e57edeee7440294e0b/public/metaTagImg.jpg?token=AF6ZD6A7XI4IS7I3MRLDQSDCTY6QK",
  externalLinks: {
    docs: "https://github.com/better-feedback/roadmap#readme",
    discord: "wwwwRFa6aj",
    twitter: "betterdao",
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
