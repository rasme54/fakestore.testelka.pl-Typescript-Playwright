import { Given, When, Then, BeforeAll } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { test } from "@playwright/test";
import newUser from "../../fixtures/newUser.json";
import HomePage from "../../PageObject/homePage";
import LoginPage from "../../PageObject/loginPage";
import MyAccountPage from "../../PageObject/myAccountPage";
import Utils from "../../PageObject/utils";

let browser: Browser;
let page: Page;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let utils: Utils;
const user = newUser;

BeforeAll(async function () {
  // Launch the browser and create a new page
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();

  // Initialize page objects
  utils = new Utils(page);
  homePage = new HomePage(page, utils);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);

  await page.goto("https://fakestore.testelka.pl/");
  await page.waitForTimeout(2000);
  await utils.turnOffPopUp("p[class='woocommerce-store-notice demo_store']", "a[class='woocommerce-store-notice__dismiss-link']");
});

Given("I am on the main page", async function () {
  await utils.isPageValid("https://fakestore.testelka.pl/");
});
Then("I fill in the sign up entry fields and confirm", async function () {
  test.setTimeout(60000);
  await homePage.selectSubpageFromHeaderNavigtion(5);
  await loginPage.fillSignUpEntryFields(user);
});
Then("I fill account infromation", async function () {
  await myAccountPage.fillAccountInformation(user);
});
Then("And I fill delivery infromation", async function () {
  await myAccountPage.selectTab(4);
  await utils.isPageValid("https://fakestore.testelka.pl/moje-konto/edytuj-adres/");
  await myAccountPage.selectTab(4);
  await myAccountPage.fillBillingAddressInformation(user);
});
Then("I fill billing infromation", async function () {
  await myAccountPage.fillDeliveryAddressInformation(user);
});
Then("I delete account", async function () {
  await myAccountPage.selectTab(1);
  await myAccountPage.deleteAccount();
});

//
