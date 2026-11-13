import { expect, type Page, test } from "@playwright/test";

const AUTHOR_NAME = "Alan Maroń";

// The API does not run in CI, so every test answers for it.
// The API runs on another origin than the page, so its answers need the CORS header.
const CORS = { "access-control-allow-origin": "*" };

const ARTICLES = [
  {
    id: "5e1f0a2b-0004-4000-8000-000000000004",
    title: "My first Nest.js API",
    content:
      "How I built the API of this blog with Nest.js, Prisma and PostgreSQL.\n\nFirst came the database, then the endpoints.",
    publishedAt: "2026-11-10T12:00:00.000Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world: why I am starting this blog",
    content: "This is the first article on my blog.",
    publishedAt: "2026-11-01T12:00:00.000Z",
  },
];
const [ARTICLE] = ARTICLES;

type ArticleAnswer = { status: number; json: unknown };

/** Answers the list, and every single article with what `answerFor` gives for its ID. */
const answerApi = async (
  page: Page,
  answerFor: (id: string) => ArticleAnswer = (id) => {
    const article = ARTICLES.find((candidate) => candidate.id === id);
    return article
      ? { status: 200, json: article }
      : { status: 404, json: { message: "Not found" } };
  },
) => {
  await page.route("**/api/v1/articles", (route) =>
    route.fulfill({ json: ARTICLES, headers: CORS }),
  );
  await page.route("**/api/v1/articles/*", (route) => {
    const id = new URL(route.request().url()).pathname.split("/").at(-1) ?? "";
    return route.fulfill({ ...answerFor(id), headers: CORS });
  });
};

const mainHeading = (page: Page) => page.getByRole("heading", { level: 1 });

test.describe("Given a visitor of the blog", () => {
  test("When they pick an article in the blog section, Then its page opens at the top without reloading the app, and Back returns them to the about me page", async ({
    page,
  }) => {
    const consoleMessages: string[] = [];
    page.on("console", (message) => {
      if (["warning", "error"].includes(message.type())) {
        consoleMessages.push(message.text());
      }
    });
    // A short window, so the blog section is below the fold and the page has to scroll to it.
    await page.setViewportSize({ width: 1280, height: 600 });
    await answerApi(page);
    await page.goto("/");
    const articleLink = page.getByRole("link", { name: ARTICLE.title });
    await articleLink.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    // A full reload would throw this marker away.
    await page.evaluate(() => Object.assign(window, { appNotReloaded: true }));

    await articleLink.click();

    await expect(page).toHaveURL(`/articles/${ARTICLE.id}`);
    await expect(mainHeading(page)).toHaveText(ARTICLE.title);
    await expect(page.locator("article p")).toHaveText([
      "How I built the API of this blog with Nest.js, Prisma and PostgreSQL.",
      "First came the database, then the endpoints.",
    ]);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    expect(await page.evaluate(() => "appNotReloaded" in window)).toBe(true);

    await page.goBack();

    await expect(page).toHaveURL("/");
    await expect(mainHeading(page)).toHaveText(AUTHOR_NAME);
    await expect(page.getByRole("link", { name: ARTICLE.title })).toBeVisible();
    expect(consoleMessages).toEqual([]);
  });

  test("When they open an article address directly, from a bookmark, Then the article loads, and the way back leads to the about me page", async ({
    page,
  }) => {
    await answerApi(page);

    await page.goto(`/articles/${ARTICLE.id}`);

    await expect(mainHeading(page)).toHaveText(ARTICLE.title);

    await page.getByRole("link", { name: "Back to the about me page" }).click();

    await expect(mainHeading(page)).toHaveText(AUTHOR_NAME);
  });

  test("When the article content contains HTML, Then nothing in it runs and the visitor sees it as text", async ({
    page,
  }) => {
    const dialogs: string[] = [];
    page.on("dialog", async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.dismiss();
    });
    const html =
      '<script>alert("script")</script><img src="x" onerror="alert(\'image\')"><b>bold</b>';
    await answerApi(page, () => ({
      status: 200,
      json: { ...ARTICLE, content: html },
    }));

    await page.goto(`/articles/${ARTICLE.id}`);

    await expect(page.locator("article p")).toHaveText(html);
    await expect(
      page.locator("article script, article img, article b"),
    ).toHaveCount(0);
    expect(dialogs).toEqual([]);
  });

  test("When the article does not exist, Then the page says so and offers a way back", async ({
    page,
  }) => {
    await answerApi(page);

    await page.goto("/articles/5e1f0a2b-9999-4000-8000-000000000999");

    await expect(mainHeading(page)).toHaveText("Article not found");
    await expect(
      page.getByRole("link", { name: "Back to the about me page" }),
    ).toBeVisible();
  });

  test("When the address has an invalid ID, Then the page says the article does not exist, without asking the API", async ({
    page,
  }) => {
    const articleRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().includes("/api/v1/articles/")) {
        articleRequests.push(request.url());
      }
    });
    await answerApi(page);

    await page.goto("/articles/not-a-valid-id");

    await expect(mainHeading(page)).toHaveText("Article not found");
    expect(articleRequests).toEqual([]);
  });

  test("When the API fails, Then an error shows, and Try again loads the article", async ({
    page,
  }) => {
    let failing = true;
    await answerApi(page, () =>
      failing
        ? { status: 500, json: { message: "Internal server error" } }
        : { status: 200, json: ARTICLE },
    );

    await page.goto(`/articles/${ARTICLE.id}`);

    await expect(page.getByRole("alert")).toHaveText(
      "The article could not be loaded.",
    );

    failing = false;
    await page.getByRole("button", { name: "Try again" }).click();

    await expect(mainHeading(page)).toHaveText(ARTICLE.title);
    await expect(page.getByRole("alert")).toHaveCount(0);
  });

  test("When the API answers with data in the wrong shape, Then an error shows instead of the data", async ({
    page,
  }) => {
    await answerApi(page, () => ({
      status: 200,
      json: { ...ARTICLE, publishedAt: "yesterday" },
    }));

    await page.goto(`/articles/${ARTICLE.id}`);

    await expect(page.getByRole("alert")).toHaveText(
      "The article could not be loaded.",
    );
    await expect(page.getByText(ARTICLE.content.split("\n")[0])).toHaveCount(0);
  });
});
