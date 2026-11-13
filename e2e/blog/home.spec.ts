import { expect, type Page, test } from "@playwright/test";

// The API does not run in CI, so every test answers for it.
const ARTICLES_URL = "**/api/v1/articles";

const ARTICLES = [
  {
    id: "5e1f0a2b-0004-4000-8000-000000000004",
    title: "My first Nest.js API",
    content: "How I built the API of this blog.",
    publishedAt: "2026-11-10T12:00:00.000Z",
  },
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "Setting up WSL, Docker and Git on Windows",
    content: "How I set up my machine for web development.",
    publishedAt: "2026-11-05T12:00:00.000Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world: why I am starting this blog",
    content: "The first article on my blog.",
    publishedAt: "2026-11-01T12:00:00.000Z",
  },
];

/** The API runs on another origin than the page, so its answers need the CORS header. */
const answerArticlesWith = (page: Page, status: number, body: unknown) =>
  page.route(ARTICLES_URL, (route) =>
    route.fulfill({
      status,
      json: body,
      headers: { "access-control-allow-origin": "*" },
    }),
  );

const blogSection = (page: Page) => page.getByRole("region", { name: "Blog" });

test.describe("Given a visitor on the home page", () => {
  test("When the API has articles, Then the blog section lists them newest first, with their dates, and nothing is logged to the console", async ({
    page,
  }) => {
    const consoleMessages: string[] = [];
    page.on("console", (message) => {
      if (["warning", "error"].includes(message.type())) {
        consoleMessages.push(message.text());
      }
    });
    await answerArticlesWith(page, 200, ARTICLES);

    await page.goto("/");

    await expect(
      blogSection(page).getByRole("heading", { level: 3 }),
    ).toHaveText([
      "My first Nest.js API",
      "Setting up WSL, Docker and Git on Windows",
      "Hello, world: why I am starting this blog",
    ]);
    await expect(blogSection(page).locator("time")).toHaveText([
      "10 November 2026",
      "5 November 2026",
      "1 November 2026",
    ]);
    expect(consoleMessages).toEqual([]);
  });

  test("When the API has no articles, Then the blog section says so", async ({
    page,
  }) => {
    await answerArticlesWith(page, 200, []);

    await page.goto("/");

    await expect(
      blogSection(page).getByText("No articles yet. Come back soon."),
    ).toBeVisible();
  });

  test("When the API fails, Then the rest of the page still shows, and Try again loads the articles", async ({
    page,
  }) => {
    await answerArticlesWith(page, 500, { message: "Internal server error" });

    await page.goto("/");

    await expect(blogSection(page).getByRole("alert")).toHaveText(
      "The articles could not be loaded.",
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("region", { name: "Contact" })).toBeVisible();

    await page.unroute(ARTICLES_URL);
    await answerArticlesWith(page, 200, ARTICLES);
    await blogSection(page).getByRole("button", { name: "Try again" }).click();

    await expect(
      blogSection(page).getByRole("heading", { name: "My first Nest.js API" }),
    ).toBeVisible();
    await expect(blogSection(page).getByRole("alert")).toHaveCount(0);
  });

  test("When the API answers with data in the wrong shape, Then the blog section shows an error instead of the data", async ({
    page,
  }) => {
    await answerArticlesWith(page, 200, [{ ...ARTICLES[0], id: 42 }]);

    await page.goto("/");

    await expect(blogSection(page).getByRole("alert")).toHaveText(
      "The articles could not be loaded.",
    );
    await expect(
      blogSection(page).getByRole("heading", { level: 3 }),
    ).toHaveCount(0);
  });

  test("When a title is very long on a 360 px wide screen, Then it wraps and the page never scrolls sideways", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await answerArticlesWith(page, 200, [
      { ...ARTICLES[0], title: "Supercalifragilisticexpialidocious".repeat(4) },
    ]);

    await page.goto("/");
    await expect(
      blogSection(page).getByRole("heading", { level: 3 }),
    ).toBeVisible();

    const sidewaysOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    expect(sidewaysOverflow).toBeLessThanOrEqual(0);
  });
});
