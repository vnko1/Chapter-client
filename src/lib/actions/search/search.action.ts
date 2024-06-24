import { privateApi } from "@/api";
import { EndpointsEnum } from "@/types";
import { tryCatchWrapper } from "@/utils";

export const querySearch = tryCatchWrapper(
  async (searchParams: { query?: string }) =>
    await privateApi(
      EndpointsEnum.Search + "?" + new URLSearchParams(searchParams)
    )
);
