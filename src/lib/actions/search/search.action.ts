import { privateApi } from "@/api";
import { EndpointsEnum } from "@/types";
import { tryCatchWrapper } from "@/utils";

type Query = { query?: string };

export const querySearch = tryCatchWrapper(async (searchParams: Query) => {
  if (searchParams.query)
    return await privateApi(
      EndpointsEnum.Search + "?" + new URLSearchParams(searchParams)
    );
  return null;
});
