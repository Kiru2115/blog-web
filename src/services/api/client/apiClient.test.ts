import { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ApiError } from "@/services/api/utils/apiError";
import { API_TIMEOUT_MS, apiClient } from "./apiClient";

describe("apiClient", () => {
  describe("when it is created", () => {
    it("sends requests to the address from VITE_API_URL", () => {
      expect(apiClient.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
    });

    it("gives up on a request that takes too long", () => {
      expect(apiClient.defaults.timeout).toBe(API_TIMEOUT_MS);
    });
  });

  describe("when a request fails", () => {
    it("rejects with an ApiError", async () => {
      const adapter = (config: InternalAxiosRequestConfig) =>
        Promise.reject(new AxiosError("Network Error", "ERR_NETWORK", config));

      await expect(apiClient.get("/articles", { adapter })).rejects.toThrow(
        ApiError,
      );
    });
  });

  describe("when a request succeeds", () => {
    it("returns the response unchanged", async () => {
      const adapter = (config: InternalAxiosRequestConfig) =>
        Promise.resolve({
          data: [],
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });

      const response = await apiClient.get("/articles", { adapter });

      expect(response.data).toEqual([]);
    });
  });
});
