import { test } from "@playwright/test";
import HomePage from "../PageObject/homePage";
import LoginPage from "../PageObject/loginPage";
import MyAccountPage from "../PageObject/myAccountPage";
import Utils from "../PageObject/utils";
import ShopPage from "../PageObject/shopPage";

test.describe("Test Scenerio 4 - Search Product", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;
  let shopPage: ShopPage;
  let utils: Utils;
  test.beforeEach(async ({ page }) => {
    utils = new Utils(page);
    homePage = new HomePage(page, utils);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    shopPage = new ShopPage(page);
    await page.goto("/");
    await page.waitForTimeout(2000);
    await utils.turnOffPopUp("p[class='woocommerce-store-notice demo_store']", "a[class='woocommerce-store-notice__dismiss-link']");
  });
  test("Test Case 9: Search Product and Valid", async ({ page }) => {
    await homePage.selectSubpageFromHeaderNavigtion(2);
    await shopPage.selectCategoryOfProduct(2)
    await shopPage.findProduct("Grań");

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Products' button
    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    // 6. Enter product name in search input and click search button
    // 7. Verify 'SEARCHED PRODUCTS' is visible
    // 8. Verify all the products related to search are visible
  });
});
