import { privateApi } from "@/api";
import { EndpointsEnum } from "@/types";
import { tryCatchWrapper } from "@/utils";

export const querySearch = tryCatchWrapper(
  async (searchParams: { query?: string }) => {
    if (searchParams.query)
      return await privateApi(
        EndpointsEnum.Search + "?" + new URLSearchParams(searchParams)
      );
    return null;
  }
);
