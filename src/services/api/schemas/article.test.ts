import { articleIdSchema, articleListSchema, articleSchema } from "./article";

const ARTICLE = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world",
  content: "The first article on my blog.",
  publishedAt: "2026-11-01T09:00:00.000Z",
};

describe("articleSchema", () => {
  describe("when the data has every field in the right shape", () => {
    it("accepts it unchanged", () => {
      expect(articleSchema.parse(ARTICLE)).toEqual(ARTICLE);
    });
  });

  describe("when the data has an extra field", () => {
    it("accepts it and leaves the extra field out", () => {
      expect(articleSchema.parse({ ...ARTICLE, author: "Alan" })).toEqual(
        ARTICLE,
      );
    });
  });

  describe.each([
    ["the id is not a UUID", { id: "1" }],
    ["the title is empty", { title: "" }],
    ["the title is not a string", { title: 42 }],
    ["the content is missing", { content: undefined }],
    ["the publication date is not a date", { publishedAt: "yesterday" }],
  ])("when %s", (_, change) => {
    it("rejects it", () => {
      expect(articleSchema.safeParse({ ...ARTICLE, ...change }).success).toBe(
        false,
      );
    });
  });
});

describe("articleListSchema", () => {
  describe("when the data is a list of articles", () => {
    it("accepts it", () => {
      expect(articleListSchema.parse([ARTICLE])).toEqual([ARTICLE]);
    });
  });

  describe("when the list is empty", () => {
    it("accepts it", () => {
      expect(articleListSchema.parse([])).toEqual([]);
    });
  });

  describe("when the data is not a list", () => {
    it("rejects it", () => {
      expect(articleListSchema.safeParse({ items: [ARTICLE] }).success).toBe(
        false,
      );
    });
  });
});

describe("articleIdSchema", () => {
  describe.each([
    ["5e1f0a2b-0001-4000-8000-000000000001", true],
    ["not-a-valid-id", false],
    ["123", false],
    ["", false],
  ])("when the ID is %j", (id, valid) => {
    it(`${valid ? "accepts" : "rejects"} it`, () => {
      expect(articleIdSchema.safeParse(id).success).toBe(valid);
    });
  });
});
