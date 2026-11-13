import { AxiosError, AxiosHeaders, CanceledError } from "axios";
import { ApiError, toApiError } from "./apiError";

const CONFIG = { headers: new AxiosHeaders() };

const responseWithStatus = (status: number) => ({
  status,
  statusText: "",
  headers: {},
  config: CONFIG,
  data: null,
});

describe("toApiError", () => {
  describe("when the API cannot be reached", () => {
    it("rejects with an ApiError without a status", async () => {
      const error = new AxiosError("Network Error", "ERR_NETWORK", CONFIG);

      const result = await toApiError(error).catch((reason) => reason);

      expect(result).toBeInstanceOf(ApiError);
      expect(result.message).toBe("The API could not be reached.");
      expect(result.status).toBeUndefined();
      expect(result.cause).toBe(error);
    });
  });

  describe("when the API answers with an error status", () => {
    it("rejects with an ApiError with that status", async () => {
      const error = new AxiosError(
        "Request failed with status code 500",
        "ERR_BAD_RESPONSE",
        CONFIG,
        null,
        responseWithStatus(500),
      );

      const result = await toApiError(error).catch((reason) => reason);

      expect(result).toBeInstanceOf(ApiError);
      expect(result.message).toBe("The API answered with status 500.");
      expect(result.status).toBe(500);
    });
  });

  describe("when the request was cancelled", () => {
    it("passes the error on unchanged", async () => {
      const error = new CanceledError(undefined, undefined, CONFIG);

      await expect(toApiError(error)).rejects.toBe(error);
    });
  });

  describe("when the error does not come from Axios", () => {
    it("passes the error on unchanged", async () => {
      const error = new TypeError("Something else broke");

      await expect(toApiError(error)).rejects.toBe(error);
    });
  });
});

describe("ApiError", () => {
  describe("when it is created without options", () => {
    it("has only a name and a message", () => {
      const error = new ApiError("Something went wrong.");

      expect(error.name).toBe("ApiError");
      expect(error.message).toBe("Something went wrong.");
      expect(error.status).toBeUndefined();
      expect(error.cause).toBeUndefined();
    });
  });
});
