import { test } from "@playwright/test";
import CartPage from "../PageObject/cartPage";
import HomePage from "../PageObject/homePage";
import LoginPage from "../PageObject/loginPage";
import MyAccountPage from "../PageObject/myAccountPage";
import ProductPage from "../PageObject/productPage";
import Utils from "../PageObject/utils";
import ShopPage from "../PageObject/shopPage";
import existingUser from "../fixtures/existingUser.json";

test.describe("Test Scenerio 4 - Search Product", () => {
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

  test("Test Case 9: Search Product and Valid", async ({ page }) => {
    const product = "Grań";
    await homePage.selectSubpageFromHeaderNavigtion(2);
    const url = "https://fakestore.testelka.pl/product-category/";
    await utils.isPageValid(url);
    await shopPage.selectCategoryOfProduct(2);
    await shopPage.findProduct(product);
    await productPage.verifyProduct(product);
  });

  test("Test Case 18: View Category Products", async ({ page }) => {
    await homePage.selectSubpageFromHeaderNavigtion(2);
    const elements = await utils.gatherElementsIntoArray("ul[class='product-categories'] > li");
    await utils.areElementsVisible(elements);
    const indexOfCategory = 2;
    const categoryLocator = "ul[class='product-categories'] > li > a";
    const categoryName = (await utils.gatherSigleElementIntoVariable(categoryLocator, indexOfCategory)).toLocaleLowerCase();
    await shopPage.selectCategoryOfProduct(indexOfCategory);
    const url = `https://fakestore.testelka.pl/product-category/${categoryName}`;
    await utils.isPageValid(url);
  });

  test("Test Case 20: Search Products and Verify Cart After Login", async ({ page }) => {
    const user = existingUser;
    const searchedPhrase = "windsurfing";
    await homePage.selectSubpageFromHeaderNavigtion(2);
    const url = "https://fakestore.testelka.pl/shop/";
    await utils.isPageValid(url);
    await shopPage.findProduct(searchedPhrase);
    await shopPage.areSerchedProductsVisible(searchedPhrase);
    const productNameLocator = "ul[class='products columns-3'] > li > a > h2";
    const collectingTextContent = true;
    const arrayOfProductsNames = await utils.gatherElementsIntoArray(productNameLocator, collectingTextContent);
    await shopPage.addAllToCartFromShopPage();
    await homePage.selectSubpageFromHeaderNavigtion(4);
    let arrayOfExpectedProductsNames = await utils.gatherElementsIntoArray("td[class='product-name'] > a", collectingTextContent); // <-- problem
    console.log(arrayOfExpectedProductsNames)
    console.log(arrayOfProductsNames)

    await utils.compareElement(arrayOfExpectedProductsNames, arrayOfProductsNames); 
    await homePage.selectSubpageFromHeaderNavigtion(5);
    await loginPage.fillLogInEntryFields(user);
    await homePage.selectSubpageFromHeaderNavigtion(4);
    arrayOfExpectedProductsNames = await utils.gatherElementsIntoArray("td[class='product-name'] > a", collectingTextContent);
    
    await utils.compareElement(arrayOfExpectedProductsNames, arrayOfProductsNames);
  });
});
