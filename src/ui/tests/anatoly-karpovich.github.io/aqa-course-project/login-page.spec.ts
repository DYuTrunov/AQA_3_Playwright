import test, { expect } from "@playwright/test";

test.describe("[UI] [aqa-course-project] Authorization", () => {
  test("Smoke authorization", async ({ page }) => {
    const credentials = {
      email: "test@gmail.com",
      password: "12345678",
    };
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    await page.locator("#emailinput").waitFor({ state: "visible" });
    await page.locator("#passwordinput").waitFor({ state: "visible" });
    await page.locator("#emailinput").fill(credentials.email);
    await page.locator("#passwordinput").fill(credentials.password);
    await page.locator("button", { hasText: "Login" }).click();
    await expect(page.getByRole("link", { name: "Anatoly" })).toBeVisible();
    await expect(page.locator(".spinner-border")).toHaveCount(0, {
      timeout: 10000,
    });
    await expect(page.locator("#sidebar")).toHaveScreenshot(
      "sidebar-after-login.png"
    );
  });
});
