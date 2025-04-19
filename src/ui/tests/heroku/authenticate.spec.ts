import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe("[UI] [Heroku] Authenticate", () => {
  const validCredentials = {
    userName: "tomsmith",
    password: "SuperSecretPassword!",
  };
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    const loginLink = page.locator('//a[@href="/login"]');
    await loginLink.click();
  });
  test("Should authenticate with valid credentials", async ({ page }) => {
    //action
    await page.locator("#username").fill(validCredentials.userName);
    await page.locator("#password").fill(validCredentials.password);
    await page.locator("button[type=submit]").click();
    //assert
    const notification = page.locator("//div[@data-alert]");
    await expect(notification).toContainText("You logged into a secure area!");
  });

  test("Should check secure page", async ({ page }) => {
    //arrange
    await page.locator("#username").fill(validCredentials.userName);
    await page.locator("#password").fill(validCredentials.password);
    await page.locator("button[type=submit]").click();
    //action
    const notification = page.locator("//div[@data-alert]");
    const pageTitle = page.locator("h2");
    const subheader = page.locator('//h4[@class="subheader"]');
    const logoutButton = page.locator('a[href="/logout"]');
    //assert
    await expect(notification).toHaveText(" You logged into a secure area!\n×");
    await expect(pageTitle).toHaveText("Secure Area");
    await expect(subheader).toHaveText(
      "Welcome to the Secure Area. When you are done click logout below."
    );
    await expect(logoutButton).toBeVisible();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  });

  test("Should NOT authenticate with invalid username", async ({ page }) => {
    //act
    await page.locator("#username").fill(validCredentials.userName + "123");
    await page.locator("#password").fill(validCredentials.password);
    await page.locator("button[type=submit]").click();
    //assert
    const notification = page.locator("#flash");
    await expect(notification).toHaveText(" Your username is invalid!\n×");
  });

  test("Should NOT authenticate with invalid password", async ({ page }) => {
    //act
    await page.locator("#username").fill(validCredentials.userName);
    await page.locator("#password").fill(validCredentials.password + "123");
    await page.locator("button[type=submit]").click();
    //assert
    const notification = page.locator("#flash");
    await expect(notification).toHaveText(" Your password is invalid!\n×");
  });
});
