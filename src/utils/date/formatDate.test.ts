import { formatDate } from "./formatDate";

describe("formatDate", () => {
  describe("when it gets a date from the API", () => {
    it("writes it in words: day, month, year", () => {
      expect(formatDate("2026-11-10T12:00:00.000Z")).toBe("10 November 2026");
    });
  });
});
