import { isAxiosError } from "axios";

interface ApiErrorOptions {
  status?: number;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, { status, cause }: ApiErrorOptions = {}) {
    super(message, { cause });
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Axios response interceptor: turns every failed request into an ApiError,
 * so the rest of the app has one kind of error to handle.
 * A cancelled request is passed on unchanged.
 */
export const toApiError = (error: unknown): Promise<never> => {
  if (!isAxiosError(error) || error.code === "ERR_CANCELED") {
    return Promise.reject(error);
  }

  const status = error.response?.status;
  const message =
    status === undefined
      ? "The API could not be reached."
      : `The API answered with status ${status}.`;

  return Promise.reject(new ApiError(message, { status, cause: error }));
};
