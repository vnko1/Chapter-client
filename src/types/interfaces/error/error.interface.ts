export interface IApiError {
  statusCode: number;
  path: string;
  errorType: string;
  errorMessage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
