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
    await shopPage.addProductToCartFromShopPage("ul[class='products columns-3'] > li > a[data-quantity='1']", 0);
    const firstProductDetails = await shopPage.collectProductDetails(0);
    await shopPage.addProductToCartFromShopPage("ul[class='products columns-3'] > li > a[data-quantity='1']", 1);
    const secondProductDetails = await shopPage.collectProductDetails(1);
    const firstProductName = await utils.normalizeText(
      await utils.gatherSingleElementIntoVariable("ul[class='products columns-3'] > li > a > h2", 0),
    );
    const secondProductName = await utils.normalizeText(
      await utils.gatherSingleElementIntoVariable("ul[class='products columns-3'] > li > a > h2", 1),
    );
    const productNamesArray = [firstProductName, secondProductName];
    await homePage.selectSubpageFromHeaderNavigtion(4);
    const namesFromCartPage = await utils.gatherElementsIntoArray("tr > td[class='product-name'] > a", collectingTextValue, useInnerTextMethod);
    await utils.compareElement(namesFromCartPage, productNamesArray);
    await cartPage.verifyProductDetails(0, firstProductDetails[0], firstProductDetails[1]);
    await cartPage.verifyProductDetails(1, secondProductDetails[0], secondProductDetails[1]);
  });

  test("Test Case 17: Remove Products From Cart", async ({ page }) => {
    const collectingTextValue = true;
    const useInnerTextMethod = true;
    await homePage.selectSubpageFromHeaderNavigtion(2);
    await shopPage.selectCategoryOfProduct(1);
    const productName = await utils.normalizeText(await utils.gatherSingleElementIntoVariable("ul[class='products columns-3'] > li > a > h2", 2));
    await shopPage.addProductToCartFromShopPage("ul[class='products columns-3'] > li > a[data-quantity='1']", 2);
    await homePage.selectSubpageFromHeaderNavigtion(4);
    const cartProductName = await utils.gatherSingleElementIntoVariable("tr > td[class='product-name'] > a", 0);
    await utils.compareElement(productName, cartProductName);
    await cartPage.removeItemFromCart(0);
  });

  test("Test Case 22: Add to cart from Recommended items", async ({ page }) => {
    await utils.scrollIntoElement("section[aria-label='Popularne produkty'] > h2");
    const popularProducts =
      "section[class='storefront-product-section storefront-popular-products'] > div[class='woocommerce columns-4 '] > ul > li  > a > h2";
    const productName = await utils.gatherSingleElementIntoVariable(popularProducts, 0);
    await shopPage.addProductToCartFromShopPage(
      "section[class='storefront-product-section storefront-popular-products'] > div[class='woocommerce columns-4 '] > ul > li  > a[data-quantity='1']",
      0,
    );
    await homePage.selectSubpageFromHeaderNavigtion(4);
    const cartProductName = await page.locator("tr > td[class='product-name'] > a").nth(0).innerText();
    await utils.compareElement(productName, cartProductName);
  });
});
