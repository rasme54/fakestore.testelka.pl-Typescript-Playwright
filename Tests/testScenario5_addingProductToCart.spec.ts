import { test } from "@playwright/test";
import CartPage from "../PageObject/cartPage";
import HomePage from "../PageObject/homePage";
import LoginPage from "../PageObject/loginPage";
import MyAccountPage from "../PageObject/myAccountPage";
import ProductPage from "../PageObject/productPage";
import ShopPage from "../PageObject/shopPage";
import Utils from "../PageObject/utils";

test.describe("TS7 - addingProductToCart", () => {
  let cartPage: CartPage;
  let homePage: HomePage;
  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;
  let productPage: ProductPage;
  let shopPage: ShopPage;
  let utils: Utils;
  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
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
  test("Test Case 12: Add Products in Cart", async ({ page }) => {
    const collectingTextValue = true;
    const useInnerTextMethod = true;
    await homePage.selectSubpageFromHeaderNavigtion(2);
    await shopPage.selectCategoryOfProduct(1);
    const addToCartButtons = await utils.gatherElementsIntoArray("ul[class='products columns-3'] > li > a[data-quantity='1']");
    await utils.waitUntilElementsAreVisible(addToCartButtons);
    await shopPage.addProductToCartFromShopPage(0);
    const firstProductDetails = await shopPage.collectProductDetails(0);
    await shopPage.addProductToCartFromShopPage(1);
    const secondProductDetails = await shopPage.collectProductDetails(1);
    const firstProductName = await utils.normalizeText(await utils.gatherSigleElementIntoVariable("ul[class='products columns-3'] > li > a > h2", 0));
    const secondProductName = await utils.normalizeText(
      await utils.gatherSigleElementIntoVariable("ul[class='products columns-3'] > li > a > h2", 1),
    );
    const productNamesArray = [firstProductName, secondProductName];
    await homePage.selectSubpageFromHeaderNavigtion(4);
    const namesFromCartPage = await utils.gatherElementsIntoArray("tr > td[class='product-name'] > a", collectingTextValue, useInnerTextMethod);
    await utils.compareElement(namesFromCartPage, productNamesArray);
    await cartPage.verifyProductDetails(0, firstProductDetails[0], firstProductDetails[1]);
    await cartPage.verifyProductDetails(1, secondProductDetails[0], secondProductDetails[1]);
  });

  test("Test Case 17: Remove Products From Cart", async ({ page }) => {
    //     1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Add products to cart
    // 5. Click 'Cart' button
    // 6. Verify that cart page is displayed
    // 7. Click 'X' button corresponding to particular product
    // 8. Verify that product is removed from the cart
  });
  test("Test Case 22: Add to cart from Recommended items", async ({ page }) => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Scroll to bottom of page
    // 4. Verify 'RECOMMENDED ITEMS' are visible
    // 5. Click on 'Add To Cart' on Recommended product
    // 6. Click on 'View Cart' button
    // 7. Verify that product is displayed in cart page
  });
});
