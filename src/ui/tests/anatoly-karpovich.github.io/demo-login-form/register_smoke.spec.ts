import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe("[UI] [demo-login-form] Register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
  });

  test("Should register with valid credentials", async ({ page }) => {
    //arrange
    await page.locator("#userNameOnRegister").fill("user123");
    await page.locator("#passwordOnRegister").fill("Passw0rd");
    await page.locator("#register").click();
    //action
    const notification = page.locator("#errorMessageOnRegister");
    //assert
    await expect(notification).toContainText("Successfully registered");
  });

  test("Should NOT register with empty credentials", async ({ page }) => {
    //arrange
    await page.locator("#register").click();
    //action
    const notification = page.locator("#errorMessageOnRegister");
    //assert
    await expect(notification).toContainText("valid data");
  });

  test("Should NOT register with username less 3 items", async ({ page }) => {
    //arrange
    await page.locator("#userNameOnRegister").fill("us");
    await page.locator("#passwordOnRegister").fill("Passw0rd123");
    await page.locator("#register").click();
    //action
    const notification = page.locator("#errorMessageOnRegister");
    //assert
    // await expect(notification).toHaveText(
    //   "Username should contain at least 3 characters"
    // );
    await expect(notification).toContainText("should contain");
  });

  test("Should NOT register with password less 8 items", async ({ page }) => {
    //arrange
    await page.locator("#userNameOnRegister").fill("user123");
    await page.locator("#passwordOnRegister").fill("Passw0r");
    await page.locator("#register").click();
    //action
    const notification = page.locator("#errorMessageOnRegister");
    //assert
    // await expect(notification).toHaveText(
    //   "Password should contain at least 8 characters"
    // );
    await expect(notification).toContainText("should contain");
  });

  test("Should NOT register with password in lowercase", async ({ page }) => {
    //arrange
    await page.locator("#userNameOnRegister").fill("user123");
    await page.locator("#passwordOnRegister").fill("passw0rd123");
    await page.locator("#register").click();
    //action
    const notification = page.locator("#errorMessageOnRegister");
    //assert
    // await expect(notification).toHaveText("Password should contain at least one character in uper case");
    await expect(notification).toContainText("should contain");
  });
});
