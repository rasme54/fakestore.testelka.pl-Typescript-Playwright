import { test, expect, Page } from "@playwright/test";
import HomePage from "../PageObject/homePage";
import LoginPage from "../PageObject/loginPage";
import MyAccountPage from "../PageObject/myAccountPage";
import Utils from "../PageObject/utils";
import existingUser from "../fixtures/existingUser.json";
import fakeUser from "../fixtures/fakeUser.json";

test.describe("Scenario 2: LogInLogOut", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;
  let utils: Utils;
  test.beforeEach(async ({ page }) => {
    utils = new Utils(page);
    homePage = new HomePage(page, utils);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    await page.goto("/");
    await page.waitForTimeout(2000);
    await utils.turnOffPopUp("p[class='woocommerce-store-notice demo_store']", "a[class='woocommerce-store-notice__dismiss-link']");
  });

  test("Test Case 2: Login User with correct email and password", async ({ page }) => {
    const user = existingUser;
    await homePage.selectLogInPage();
    await loginPage.fillLogInEntryFields(user);
    await myAccountPage.isUserLoggedIn(user);
  });

  test("Test Case 3: Login User with incorrect email and password", async ({ page }) => {
    const user = fakeUser;
    await homePage.selectLogInPage();
    await loginPage.fillLogInEntryFields(user);
    utils.isStringContains("ul[class='woocommerce-error'] > li", "Nieznany adres e-mail. Proszę sprawdzić ponownie lub wypróbować swoją nazwę użytkownika.");
  });

  test("Test Case 4: Logout User", async ({ page }) => {
    const user = existingUser;
    await homePage.selectLogInPage();
    await loginPage.fillLogInEntryFields(user);
    await myAccountPage.logOutUser();
    await utils.isStringContains("div[class='u-column1 col-1'] > h2", "Zaloguj się");
  });
});
