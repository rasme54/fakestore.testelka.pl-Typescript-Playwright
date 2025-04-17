import { test } from "@playwright/test";
import HomePage from "../PageObject/homePage";
import LoginPage from "../PageObject/loginPage";
import MyAccountPage from "../PageObject/myAccountPage";
import ProductPage from "../PageObject/productPage";
import Utils from "../PageObject/utils";
import ShopPage from "../PageObject/shopPage";
import CategoryPage from "../PageObject/categoryPage";

test.describe("Test Scenerio 4 - Search Product", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;
  let productPage: ProductPage;
  let shopPage: ShopPage;
  let categoryPage: CategoryPage;
  let utils: Utils;

  test.beforeEach(async ({ page }) => {
    utils = new Utils(page);
    homePage = new HomePage(page, utils);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    productPage = new ProductPage(page);
    shopPage = new ShopPage(page);
    categoryPage = new CategoryPage(page);
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
    await utils.areElementsVisible(elements);
    const indexOfCategory = 2;
    const categoryLocator = "ul[class='product-categories'] > li > a";
    const categoryName = (await categoryPage.collectCategoryNameIntoVariable(categoryLocator, indexOfCategory)).toLocaleLowerCase();
    await productPage.selectCategoryOfProduct(indexOfCategory);
    const url = `https://fakestore.testelka.pl/product-category/${categoryName}`;
    await utils.isPageValid(url);
  });
});
