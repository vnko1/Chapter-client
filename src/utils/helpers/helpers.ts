import { CustomError } from "@/services";

export const JSONParser = <T>(data: T): T => JSON.parse(JSON.stringify(data));

export const tryCatchWrapper =
  <T, K>(cb: (data: T) => Promise<K | CustomError>) =>
  async (data: T): Promise<K | CustomError> => {
    try {
      const res = await cb(data);
      return JSONParser(res);
    } catch (error) {
      if (error instanceof CustomError) {
        return JSONParser(error);
      } else if (error instanceof Error) {
        return JSONParser(
          new CustomError(500, "Unknown Path", "Unknown Error", error.message)
        );
      } else {
        return JSONParser(
          new CustomError(
            500,
            "Unknown Path",
            "Unknown Error",
            "Something went wrong! Try again later."
          )
        );
      }
    }
  };
