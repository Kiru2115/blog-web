import axios from "axios";
import { toApiError } from "@/services/api/utils/apiError";

export const API_TIMEOUT_MS = 10_000;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: API_TIMEOUT_MS,
  headers: { Accept: "application/json" },
});

apiClient.interceptors.response.use((response) => response, toApiError);
