import { splitParagraphs } from "./splitParagraphs";

describe("splitParagraphs", () => {
  describe("when the text has no empty line", () => {
    it("gives one paragraph", () => {
      expect(splitParagraphs("One paragraph only.")).toEqual([
        "One paragraph only.",
      ]);
    });
  });

  describe("when empty lines separate the text", () => {
    it("gives a paragraph for every part", () => {
      expect(splitParagraphs("First.\n\nSecond.\n\n\nThird.")).toEqual([
        "First.",
        "Second.",
        "Third.",
      ]);
    });
  });

  describe("when an empty line holds only spaces, or the text uses Windows line ends", () => {
    it("still ends the paragraph there", () => {
      expect(splitParagraphs("First.\r\n  \r\nSecond.")).toEqual([
        "First.",
        "Second.",
      ]);
    });
  });

  describe("when a paragraph has a single line break", () => {
    it("keeps the break inside the paragraph", () => {
      expect(splitParagraphs("Line one\nline two")).toEqual([
        "Line one\nline two",
      ]);
    });
  });

  describe("when the text starts or ends with empty lines", () => {
    it("gives no empty paragraphs", () => {
      expect(splitParagraphs("\n\nText.\n\n")).toEqual(["Text."]);
    });
  });
});
