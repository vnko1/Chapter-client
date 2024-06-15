import { IApiError } from "@/types";

export class CustomError extends Error implements IApiError {
  statusCode: number;
  path: string;
  errorType: string;
  errorMessage: string;
  data: { [key: string]: string | object } | null;

  constructor({ statusCode, path, errorType, errorMessage, data }: IApiError) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.path = path;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.data = data || null;
  }
}
