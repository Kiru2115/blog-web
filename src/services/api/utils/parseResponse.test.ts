import { z } from "zod";
import { ApiError } from "./apiError";
import { parseResponse } from "./parseResponse";

const schema = z.object({ name: z.string() });

describe("parseResponse", () => {
  describe("when the data matches the schema", () => {
    it("returns the data", () => {
      expect(parseResponse(schema, { name: "Alan" })).toEqual({
        name: "Alan",
      });
    });
  });

  describe("when the data does not match the schema", () => {
    it("throws an ApiError that keeps the Zod error as its cause", () => {
      let thrown: unknown;

      try {
        parseResponse(schema, { name: 42 });
      } catch (error) {
        thrown = error;
      }

      expect(thrown).toBeInstanceOf(ApiError);
      expect((thrown as ApiError).message).toBe(
        "The API answered with data in an unexpected shape.",
      );
      expect((thrown as ApiError).cause).toBeInstanceOf(z.ZodError);
    });
  });
});
