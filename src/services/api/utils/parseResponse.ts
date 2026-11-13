import type { z } from "zod";
import { ApiError } from "./apiError";

/**
 * Checks data from the API against a Zod schema.
 * Data that does not match is an error, never something to show.
 */
export const parseResponse = <Schema extends z.ZodType>(
  schema: Schema,
  data: unknown,
): z.infer<Schema> => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ApiError("The API answered with data in an unexpected shape.", {
      cause: result.error,
    });
  }

  return result.data;
};
