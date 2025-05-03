import test, { expect } from "@playwright/test";

test.describe("[UI] [demo-login-form] Register", () => {
  const user = {
    firstName: "Dmitry",
    lastName: "Trunov",
    address: "Astrakhan, Babaevskogo street 39 apartment 4",
    email: "oldfag.87@gmail.com",
    phone: "89272820819",
    country: "USA",
    language: "English, Russian",
    gender: "male",
    day: "28",
    month: "June",
    year: "1987",
    password: "Passw0rd!",
    skills: ["JavaScript", "Java"],
    hobbies: ["Travelling", "Sports", "Gaming"],
  };
  test("Should register with valid credentials", async ({ page }) => {
    //arrange
    await page.goto(
      "https://anatoly-karpovich.github.io/demo-registration-form/"
    );
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const address = page.locator("#address");
    const email = page.locator("#email");
    const phone = page.locator("#phone");
    const country = page.locator("#country");
    const gender = page.locator('//*[@type="radio"][1]');
    const checkbox = {
      Travelling: page.locator(`[value="${user.hobbies[0]}"]`),
      Sports: page.locator(`[value="${user.hobbies[1]}"]`),
      Gaming: page.locator(`[value="${user.hobbies[2]}"]`),
    };
    const language = page.locator("#language");
    const skills = page.locator("#skills");
    const year = page.locator("#year");
    const month = page.locator("#month");
    const day = page.locator("#day");
    const password = {
      input: page.locator("#password"),
      confirm: page.locator("#password-confirm"),
    };
    const buttonSubmit = page.locator('[type="submit"]');

    // action
    await firstName.fill(user.firstName);
    await lastName.fill(user.lastName);
    await address.fill(user.address);
    await email.fill(user.email);
    await phone.fill(user.phone);
    await country.selectOption(user.country);
    await gender.click();
    await checkbox.Travelling.click();
    await checkbox.Sports.click();
    await checkbox.Gaming.click();
    await language.fill(user.language);
    await skills.selectOption(user.skills);
    await year.selectOption(user.year);
    await month.selectOption(user.month);
    await day.selectOption(user.day);
    await password.input.fill(user.password);
    await password.confirm.fill(user.password);
    await buttonSubmit.click();

    //assert
    const notification = page.locator("h2.text-center");
    const fullname = page.locator("#fullName");
    const hobbies = page.locator("#hobbies");
    const dateOfBirth = page.locator("#dateOfBirth");
    await expect(notification).toHaveText("Registration Details");
    await expect(fullname).toHaveText(`${user.firstName} ${user.lastName}`);
    await expect(address).toHaveText(user.address);
    await expect(email).toHaveText(user.email);
    await expect(phone).toHaveText(user.phone);
    await expect(country).toHaveText(user.country);
    await expect(language).toHaveText(user.language);
    await expect(skills).toHaveText(`${user.skills[0]}, ${user.skills[1]}`);
    await expect(hobbies).toHaveText(
      `${user.hobbies[0]}, ${user.hobbies[1]}, ${user.hobbies[2]}`
    );
    await expect(dateOfBirth).toHaveText(
      `${user.day} ${user.month} ${user.year}`
    );
  });
});
