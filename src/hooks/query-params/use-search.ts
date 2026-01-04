import { parseAsString, useQueryState } from "nuqs";

export const useUserSearchParams = () => {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));

  return {
    q,
    setQ,
  };
};
