import { test, expect, Page } from "@playwright/test";
import Utils from "./utils";
import newUser from "../fixtures/newUser.json";

export class MyAccountPage {
  private page: Page;
  private utils: Utils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
  }

  async deleteAccount(): Promise<void> {
    const url = this.page.url();
    if (url == "https://fakestore.testelka.pl/moje-konto/") {
      this.selectTab(1);
    }
    const deleteButton = this.page.locator("a[class='delete-me']");
    await expect(async () => {
      this.page.on("dialog", (confirm) => confirm.accept());
      expect(deleteButton).toBeVisible();
      await deleteButton.click({ force: true });
    }).toPass();
  }

  async fillAccountInformation(user: any): Promise<void> {
    await this.selectTab(3);
    await this.page.locator("#account_first_name").fill(user.firstName);
    await this.page.locator("#account_last_name").fill(user.lastName);
    const displayName = await this.page.locator("#account_display_name").inputValue();
    expect(displayName).toBe((user.firstName + "." + user.lastName).toLowerCase());
    await this.page.locator("button[value='Zapisz zmiany']").click();
    await this.utils.isStringContains("div[class='woocommerce-message']", "Zmieniono szczegóły konta.");
  }
  async fillBillingAddressInformation(user: any): Promise<void> {
    await this.page.locator("a[class='edit']").nth(0).click({ force: true });
    await this.utils.selectFromDropdown(user.polishCountryName);
    await this.page.locator("#billing_address_1").fill(user.address1);
    await this.page.locator("#billing_address_2").fill(user.address2);
    await this.page.locator("#billing_postcode").fill(user.zipcode);
    await this.page.locator("#billing_city").fill(user.city);
    await this.page.locator("#billing_phone").fill(user.mobileNumber);
    const email = await this.page.locator("input[id='billing_email']").inputValue();
    expect(email).toBe(user.email);
    await this.page.locator("button[value='Zapisz adres']").click({ force: true });
    await this.utils.isStringContains("div[class='woocommerce-message']", "Adres został zmieniony.");
  }

  async fillDeliveryAddressInformation(user: any): Promise<void> {
    await this.page.locator("a[class='edit']").nth(1).click({ force: true });
    await this.page.locator("#shipping_first_name").fill(user.firstName);
    await this.page.locator("#shipping_last_name").fill(user.lastName);
    await this.utils.selectFromDropdown(user.polishCountryName);
    await this.page.locator("#shipping_address_1").fill(user.address1);
    await this.page.locator("#shipping_address_2").fill(user.address2);
    await this.page.locator("#shipping_postcode").fill(user.zipcode);
    await this.page.locator("#shipping_city").fill(user.city);
    await this.page.locator("button[value='Zapisz adres']").click({ force: true });
    await this.utils.isStringContains("div[class='woocommerce-message']", "Adres został zmieniony.");
  }

  async isUserLoggedIn(user: any): Promise<void> {
    const url = this.page.url();
    if (url != "https://fakestore.testelka.pl/moje-konto/") {
      this.selectTab(1);
    }
    let email = user.email;
    const userName = email.split("@")[0];
    const expectedMessage = `Witaj ${userName} (nie jesteś ${userName}? Wyloguj się)`;
    const loggedUserMessage = await this.page.locator("div[class='woocommerce-MyAccount-content'] > p").nth(0).textContent();
    expect(loggedUserMessage).toBe(expectedMessage);
  }

  async logOutUser(): Promise<void> {
    const url = this.page.url();
    if (url != "https://fakestore.testelka.pl/moje-konto/") {
      this.selectTab(1);
    }
    const logOutButton = this.page.locator("div[class='woocommerce-MyAccount-content'] > p > a").nth(0);
    await logOutButton.click({ force: true });
  }

  async selectTab(number: number): Promise<void> {
    /**
     * Navigates to a specific tab
     * 1- Dashboard
     * 2- My orders
     * 3- Account edition
     * 4- Address
     * 5- Log out
     */
    if (number >= 0 && number <= 5) {
      const index = number - 1;
      const dashboardButton = this.page.locator("ul[class='phoen_nav_tab'] > li > a").nth(index);
      expect(dashboardButton).toBeVisible();
      await dashboardButton.click({ force: true });
    }
  }
}

export default MyAccountPage;
