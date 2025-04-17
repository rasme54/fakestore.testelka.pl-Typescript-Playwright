import { test } from "@playwright/test";
import HomePage from "../PageObject/homePage";
import LoginPage from "../PageObject/loginPage";
import MyAccountPage from "../PageObject/myAccountPage";
import ProductPage from "../PageObject/productPage";
import Utils from "../PageObject/utils";
import ShopPage from "../PageObject/shopPage";

test.describe("Test Scenerio 4 - Search Product", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;
  let productPage: ProductPage;
  let shopPage: ShopPage;
  let utils: Utils;

  test.beforeEach(async ({ page }) => {
    utils = new Utils(page);
    homePage = new HomePage(page, utils);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    productPage = new ProductPage(page);
    shopPage = new ShopPage(page);
    await page.goto("/");
    await page.waitForTimeout(2000);
    await utils.turnOffPopUp("p[class='woocommerce-store-notice demo_store']", "a[class='woocommerce-store-notice__dismiss-link']");
  });

  test("Test Case 9: Search Product and Valid", async ({ page }) => {
    const product = "Grań";
    await homePage.selectSubpageFromHeaderNavigtion(2);
    await shopPage.selectCategoryOfProduct(2);
    await shopPage.findProduct(product);
    await productPage.verifyProduct(product);
  });

  test("Test Case 18: View Category Products", async ({ page }) => {
    await homePage.selectSubpageFromHeaderNavigtion(2);
    const elements = await utils.gatherElementsIntoArray("ul[class='product-categories'] > li");
    console.log(elements);
    await utils.areElementsVisible(elements);

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that categories are visible on right side bar
    // 4. Click on 'Wspinaczka' category
    // 5. Click on any category link under 'Women' category, for example: Dress
    // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    // 7. On left side bar, click on any sub-category link of 'Men' category
    // 8. Verify that user is navigated to that category page
  });
});
