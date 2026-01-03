import { parseAsString, useQueryState } from "nuqs";

export const useSearchParams = () => {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""));

  return {
    q,
    setQ,
  };
};
