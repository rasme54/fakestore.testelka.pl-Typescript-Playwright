import { test, expect, Page } from "@playwright/test";
import newUser from "../fixtures/newUser.json";

class MyAccountPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillAccountInformation(): Promise<void> {
    const user = newUser;
    await this.page.getByRole("link", { name: "Edycja konta" }).click();
    await this.page.locator("#account_first_name").fill(user.firstName);
    await this.page.locator("#account_last_name").fill(user.lastName);
    const displayName = ((await this.page.locator("#account_display_name").inputValue())).toLowerCase();
    expect(displayName).toBe(user.firstName + "." + user.lastName);
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
}

export default MyAccountPage;
