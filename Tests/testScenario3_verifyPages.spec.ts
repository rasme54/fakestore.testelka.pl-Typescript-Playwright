import { test } from "@playwright/test";
import LoginPage from "../PageObject/loginPage";
import SignUpPage from "../PageObject/signUpPage";
import HomePage from "../PageObject/homePage";
import MyAccountPage from "../PageObject/myAccountPage";
import ShopPage from "../PageObject/shopPage";
import Utils from "../PageObject/utils";
import existingUser from "../fixtures/existingUser.json";
import newUser from "../fixtures/newUser.json";

test.describe("Scenario 3: Verify Pages", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let signUpPage: SignUpPage;
  let myAccountPage: MyAccountPage;
  let shopPage: ShopPage;
  let utils: Utils;

  test.beforeEach(async ({ page }) => {
    utils = new Utils(page);
    homePage = new HomePage(page, utils);
    loginPage = new LoginPage(page);
    signUpPage = new SignUpPage(page);
    myAccountPage = new MyAccountPage(page);
    shopPage = new ShopPage(page);
    await page.goto("/");
    await page.waitForTimeout(2000);
    await utils.turnOffPopUp("p[class='woocommerce-store-notice demo_store']", "a[class='woocommerce-store-notice__dismiss-link']");
  });

  test("Test Case 8: Verify All Products and product detail page", async ({ page }) => {
    await homePage.selectSubpageFromHeaderNavigtion(2);
    await shopPage.selectCategoryOfProduct(1);
    await shopPage.addProduct(0);
    await utils.isPageValid("https://fakestore.testelka.pl/product/egipt-el-gouna/");
    const productName = page.locator("h1[class='product_title entry-title']");
    const category = page.locator("span[class='posted_in']");
    const price = page.locator("span[class='woocommerce-Price-amount amount'] > bdi").nth(0);
    await utils.areElementsVisible([productName, category, price]);
  });
});
