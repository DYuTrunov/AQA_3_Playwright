import test, { expect } from "@playwright/test";

test.describe(" [UI] [Heroku] Dynamic Controls", () => {
  test("Test", async ({ page }) => {
    const removeButton = page.locator("button", { hasText: "Remove" });
    const checkboxElement = page.locator('input[type="checkbox"]');
    const addButton = page.locator("button", { hasText: "Add" });
    const messageElement = page.locator("#message");
    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link", { name: "Dynamic Controls" }).click();
    await expect(removeButton).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Dynamic Controls" })
    ).toBeVisible();
    await expect(checkboxElement).toBeVisible();
    await expect(checkboxElement).not.toBeChecked();
    await checkboxElement.check();
    await removeButton.click();
    await expect(checkboxElement).toBeHidden();
    await expect(addButton).toBeVisible();
    await expect(messageElement).toHaveText("It's gone!");
    await addButton.click();
    await checkboxElement.waitFor({ state: "visible" });
    await expect(messageElement).toHaveText("It's back!");
  });
});
