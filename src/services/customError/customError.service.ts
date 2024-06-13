import { IApiError } from "@/types";

export class CustomError extends Error implements IApiError {
  additionalMessage: string | undefined;
  constructor(
    public statusCode: number,
    public path: string,
    public errorType: string,
    public errorMessage: string,
    additionalMessage?: string
  ) {
    super(errorMessage);
    this.additionalMessage = additionalMessage;
  }
}
