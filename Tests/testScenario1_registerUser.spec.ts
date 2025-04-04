import { test, expect, Page } from "@playwright/test";
import HomePage from "../PageObject/homePage";
import LoginPage from "../PageObject/loginPage";
import MyAccountPage from "../PageObject/myAccountPage";
import Utils from "../PageObject/utils";
import newUser from "../fixtures/newUser.json";

test.describe("Scenario 1: Register User", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;
  let utils: Utils;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    utils = new Utils(page);
  });

  test("TestCase1: Register User", async ({ page }) => {
    const user = newUser;
    await page.goto("/");
    await homePage.selectLogInPage();
    await utils.isStringVisible("div[class='u-column2 col-2'] > h2", "Zarejestruj się");
    await utils.turnOffPopUp("p[class='woocommerce-store-notice demo_store']", "a[class='woocommerce-store-notice__dismiss-link']");
    await loginPage.fillSignUpEntryFields();
    await myAccountPage.fillAccountInformation();
    await utils.isStringContians("div[class='woocommerce-message']", "Zmieniono szczegóły konta.");
    await myAccountPage.selectSubPage(4);
    await utils.isPageValid("https://fakestore.testelka.pl/moje-konto/edytuj-adres/");
    await myAccountPage.fillBillingAddressInformation();
  });
  test("TestCase2: Delete User", async ({ page }) => {
    await page.goto("/");
    await homePage.selectLogInPage();
    await utils.isStringVisible("div[class='u-column2 col-2'] > h2", "Zarejestruj się");
    await utils.turnOffPopUp("p[class='woocommerce-store-notice demo_store']", "a[class='woocommerce-store-notice__dismiss-link']");
    await loginPage.fillLogInEntryFields();
    await myAccountPage.deleteAccount();
  });
});

// 6. Enter name and email address
// 7. Click 'Signup' button
// 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
// 9. Fill details: Title, Name, Email, Password, Date of birth
// 10. Select checkbox 'Sign up for our newsletter!'
// 11. Select checkbox 'Receive special offers from our partners!'
// 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
// 13. Click 'Create Account button'
// 14. Verify that 'ACCOUNT CREATED!' is visible
// 15. Click 'Continue' button
// 16. Verify that 'Logged in as username' is visible
// 17. Click 'Delete Account' button
// 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
