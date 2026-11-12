import { expect, type Page, test } from "@playwright/test";

const AUTHOR_NAME = "Alan Maroń";
const READING_WIDTH = 768;

const openHomePage = async (page: Page) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
};

test.describe("Given a visitor on the home page", () => {
  test("When the page opens, Then it shows the author's name as the main heading", async ({
    page,
  }) => {
    await openHomePage(page);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      AUTHOR_NAME,
    );
  });

  test("When the screen is 360 px wide, Then everything is readable and the page never scrolls sideways", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await openHomePage(page);

    const sidewaysOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    expect(sidewaysOverflow).toBeLessThanOrEqual(0);
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
  });

  test("When the screen is 1440 px wide, Then the content stays at a comfortable reading width", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await openHomePage(page);

    const main = await page.getByRole("main").boundingBox();

    expect(main?.width).toBeLessThanOrEqual(READING_WIDTH);
  });

  test("When a keyboard user presses Tab, Then every link is reached in reading order with visible focus", async ({
    page,
  }) => {
    await openHomePage(page);
    const linkNames = await page.getByRole("link").allTextContents();

    for (const linkName of linkNames) {
      await page.keyboard.press("Tab");
      const focused = page.locator(":focus");

      await expect(focused).toHaveText(linkName);

      const focusStyle = await focused.evaluate((element) => {
        const style = getComputedStyle(element);
        return { outline: style.outlineStyle, shadow: style.boxShadow };
      });

      expect(
        focusStyle.outline !== "none" || focusStyle.shadow !== "none",
      ).toBe(true);
    }
  });

  test("When the page shows images, Then every image has a text alternative", async ({
    page,
  }) => {
    await openHomePage(page);

    await expect(page.locator("img")).not.toHaveCount(0);
    await expect(page.locator("img:not([alt])")).toHaveCount(0);
  });
});
