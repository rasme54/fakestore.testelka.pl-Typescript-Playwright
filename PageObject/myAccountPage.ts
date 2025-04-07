import { test, expect, Page } from "@playwright/test";
import newUser from "../fixtures/newUser.json";

class MyAccountPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async deleteAccount(): Promise<void> {
    const url = this.page.url();
    if (url == "https://fakestore.testelka.pl/moje-konto/") {
      this.selectSubPage(1);
    }
    const deleteButton = this.page.locator("a[class='delete-me']");
    await expect(async () => {
      this.page.on("dialog", (confirm) => confirm.accept());
      expect(deleteButton).toBeVisible();
      await deleteButton.click({ force: true });
    }).toPass();
  }

  async fillAccountInformation(): Promise<void> {
    const user = newUser;
    await this.selectSubPage(3);
    await this.page.locator("#account_first_name").fill(user.firstName);
    await this.page.locator("#account_last_name").fill(user.lastName);
    const displayName = await this.page.locator("#account_display_name").inputValue();
    expect(displayName).toBe((user.firstName + "." + user.lastName).toLowerCase());
    await this.page.locator("button[value='Zapisz zmiany']").click();

    // await this.page.locator("input[id='email']").fill(user.email);
    // await this.page.locator("input[id='password']").fill(user.password);
    // await this.page.locator("select[id='days']").selectOption({label: '1'});
    // await this.page.locator("select[id='months']").selectOption({label: 'January'});
    // await this.page.locator("select[id='years']").selectOption({label: '2000'});
    // await this.page.locator("input[id='newsletter']").check();
    // await this.page.locator("input[id='optin']").check();
    // await this.page.locator("input[id='first_name']").fill(user.firstName);
    // await this.page.locator("input[id='last_name']").fill(user.lastName);
    // await this.page.locator("input[id='company']").fill(user.company);
    // await this.page.locator("input[id='address1']").fill(user.address1);
    // await this.page.locator("input[id='address2']").fill(user.address2);
    // await this.page.locator("select[id='country']").selectOption({label: 'United States'});
    // await this.page.locator("input[id='state']").fill(user.state);
    // await this.page.locator("input[id='city']").fill(user.city);
    // await this.page.locator("input[id='zipcode']").fill(user.zipcode);
    // await this.page.locator("input[id='mobile_number']").fill(user.mobileNumber);
  }
  async fillBillingAddressInformation(): Promise<void> {
    const user = newUser;
    await this.selectSubPage(4);
    await this.page.locator("a[class='edit']").nth(0).click({ force: true });
    const countryField = this.page.locator("span[class='select2-selection__rendered']");
    await countryField.pressSequentially(user.state, { delay: 100 });
    await this.page.keyboard.press("Enter");
    await this.page.locator("#select2-billing_country-container").click({ force: true });
    const countryList = this.page.getByRole("listitem").filter({ hasText: "Stany Zjednoczone" });
    await countryList.click({ force: true });
    //await countryList.filter({hasText: "Stany Zjednoczone"}).click();
    // await this.page.locator("#billing_address_1").pressSequentially(user.address1, { delay: 100 });
    // await this.page.locator("#billing_address_2").pressSequentially(user.address2, { delay: 100 });
    // await this.page.locator("#billing_postcode").pressSequentially(user.zipcode, { delay: 100 });
    // await this.page.locator("#billing_city").pressSequentially(user.city, { delay: 100 });
    // await this.page.locator("#billing_phone").pressSequentially(user.mobileNumber, { delay: 100 });
    // const email = await this.page.locator("#billing_email").inputValue();
    // expect(email).toBe(user.email);
    // await this.page.locator("button[name='save_address']").click({ force: true });
  }

  async selectSubPage(number: number): Promise<void> {
    /**
     * Navigates to a specifuc subpage
     * 1- Dashboard
     * 2- My orders
     * 3- Account edition
     * 4- Address
     * 5- Log out
     */
    if (number >= 0 && number <= 5) {
      const dashboardButton = this.page.locator("ul[class='phoen_nav_tab'] > li > a").nth(--number);
      await expect(dashboardButton).toBeVisible();
      await dashboardButton.click({ force: true });
    }
  }
}

export default MyAccountPage;
