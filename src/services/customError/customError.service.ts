import { IApiError } from "@/types";

export class CustomError extends Error implements IApiError {
  statusCode: number;
  path: string;
  errorType: string;
  errorMessage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;

  constructor({ statusCode, path, errorType, errorMessage, data }: IApiError) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.path = path;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.data = data || null;
  }
}
