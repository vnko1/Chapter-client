import { privateApi } from "@/api";
import { EndpointsEnum } from "@/types";
import { tryCatchWrapper } from "@/utils";

export const addPost = tryCatchWrapper(
  async (data: FormData) =>
    await privateApi(EndpointsEnum.Post, {
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: data,
      method: "POST",
    })
);

export const changePost = tryCatchWrapper(
  async ({ postId, data }: { postId: string; data: FormData }) =>
    await privateApi(EndpointsEnum.Post + "/" + postId, {
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: data,
      method: "PATCH",
    })
);
