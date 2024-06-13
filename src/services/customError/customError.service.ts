import { IApiError } from "@/types";

export class CustomError extends Error implements IApiError {
  data: unknown | undefined;
  constructor(
    public statusCode: number,
    public path: string,
    public errorType: string,
    public errorMessage: string,
    data?: unknown
  ) {
    super(errorMessage);
    this.data = data;
  }
}
