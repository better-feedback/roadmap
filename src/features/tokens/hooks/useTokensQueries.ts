import { useQuery, UseQueryOptions } from "react-query";
import { chainsToApi } from "features/common/constants";
import type { Token } from "../types";

export function useTokensQuery(
  chainName: string,
  options?: Omit<
    UseQueryOptions<Token[], unknown, Token[], string[]>,
    "queryKey" | "queryFn"
  >
) {
  const { getTokens } = chainsToApi[chainName];

  return useQuery(["tokens", chainName], getTokens);
}
