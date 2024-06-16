import { CustomError } from "@/services";
import { ErrorType } from "@/types";

export const JSONParser = <T>(data: T): T => JSON.parse(JSON.stringify(data));

export const tryCatchWrapper =
  <T, K>(cb: (data: T) => Promise<K | ErrorType>) =>
  async (data: T): Promise<K | ErrorType> => {
    try {
      const res = await cb(data);
      return JSONParser(res);
    } catch (error) {
      if (error instanceof CustomError)
        return JSONParser({ error, isError: true });
      if (error instanceof Error)
        return JSONParser({
          error: new CustomError({
            statusCode: 500,
            path: "Unknown Path",
            errorType: "Unknown Error",
            errorMessage: error.message,
          }),
          isError: true,
        });

      return JSONParser({
        error: new CustomError({
          statusCode: 500,
          path: "Unknown Path",
          errorType: "Unknown Error",
          errorMessage: "Something went wrong! Try again later.",
        }),
        isError: true,
      });
    }
  };
