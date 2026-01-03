import { defaultValues } from "@/constants";
import { parseAsInteger, useQueryState } from "nuqs";

// using nuqs for query params management

export const usePaginationParams = () => {
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(defaultValues.DEFAULT_LIMIT)
  );

  const [skip, setSkip] = useQueryState(
    "skip",
    parseAsInteger.withDefault(defaultValues.DEFAULTL_SKIP)
  );

  return {
    limit,
    setLimit,
    skip,
    setSkip,
  };
};
