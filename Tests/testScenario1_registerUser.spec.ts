import { test, expect, Page } from "@playwright/test";
import HomePage from "../PageObject/homePage";
import LoginPage from "../PageObject/loginPage";
import MyAccountPage from "../PageObject/myAccountPage";
import Utils from "../PageObject/utils";
import exisitingUser from "../fixtures/existingUser.json";
import newUser from "../fixtures/newUser.json";

test.describe("Scenario 1: Register User", () => {
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

  test("TestCase1: Register User", async ({ page }) => {
    const user = newUser;
    test.setTimeout(60000);
    await homePage.selectLogInPage();
    await loginPage.fillSignUpEntryFields(user);
    await myAccountPage.fillAccountInformation(user);
    await myAccountPage.selectSubPage(4);
    await utils.isPageValid("https://fakestore.testelka.pl/moje-konto/edytuj-adres/");
    await myAccountPage.selectSubPage(4);
    await myAccountPage.fillBillingAddressInformation(user);
    await myAccountPage.fillDeliveryAddressInformation(user);
    await myAccountPage.selectSubPage(1);
    await myAccountPage.deleteAccount();
  });

  test("Test Case 5: Register User with existing email", async ({ page }) => {
    const user = exisitingUser;
    await homePage.selectLogInPage();
    await loginPage.fillSignUpEntryFields(user);
    const expectedString = "Konto jest już zarejestrowane w exisitngjohn.doe@email.com. Zaloguj się lub użyj innego adresu e-mail.";
    await utils.isStringVisible("ul[class='woocommerce-error'] > li", expectedString);
  });

  test.skip("Helper Case: Delete User", async ({ page }) => {
    const user = newUser;
    await homePage.selectLogInPage();
    await loginPage.fillLogInEntryFields(user);
    await myAccountPage.deleteAccount();
  });
});
